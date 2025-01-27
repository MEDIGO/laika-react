export const DEFAULT_TIMEOUT = 1.5 * 60 * 1000

const laikaKey = (key: string) => `laika_${key}`

type LaikaInfo = {
  value: boolean
  timestamp: number
  env: string
}

function save(key: string, env: string, value: boolean) {
  localStorage.setItem(
    laikaKey(key),
    JSON.stringify({
      value,
      timestamp: Date.now(),
      env,
    }),
  )
  return value
}

const isValidLaika = (data: any): data is LaikaInfo =>
  data &&
  typeof data === 'object' &&
  typeof data.value === 'boolean' &&
  typeof data.timestamp === 'number' &&
  typeof data.env === 'string'

export function loadCached(
  key: string,
  env: string,
  timeout = DEFAULT_TIMEOUT,
): boolean | undefined {
  const item = localStorage.getItem(laikaKey(key))

  if (!item) {
    return undefined
  }

  const data = JSON.parse(item)

  if (!isValidLaika(data)) {
    return undefined
  }

  const { value, timestamp, env: itemEnv } = data

  if (env !== itemEnv) {
    return undefined
  }

  if (Date.now() - Number(timestamp) > timeout) {
    return undefined
  }

  return value
}

async function parseResponse(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type')

  if (contentType === null || !contentType.startsWith('application/json')) {
    throw new Error(
      `expected content-type to be application/json, got: ${contentType}`,
    )
  }

  return res.json()
}

async function fetchStatus(
  feature: string,
  uri: string,
  env: string,
): Promise<boolean> {
  const laikaUrl = `${uri}/api/features/${feature}/status/${env}`
  try {
    const res = await fetch(laikaUrl, {
      method: 'GET',
    })

    if (res.status !== 200) {
      throw new Error(`expected status code 200, got ${res.status}`)
    }

    if (!res.ok) {
      throw new Error('response is not ok')
    }

    const body = await parseResponse(res)

    if (body === undefined) {
      throw new Error('Response Body is missing')
    }
    return Boolean(body)
  } catch {
    return false
  }
  return false
}

export async function getFeatureStatus(
  feature: string,
  uri: string,
  env: string,
  timeout: number = DEFAULT_TIMEOUT,
): Promise<boolean> {
  const cached = loadCached(feature, env, timeout)
  if (cached !== undefined) {
    return cached
  }

  const result = await fetchStatus(feature, uri, env)
  save(feature, env, result)
  return result
}
