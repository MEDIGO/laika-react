export const DEFAULT_TIMEOUT = 60 * 60 * 1000
export const FEATURE_TIMEOUT = 1.5 * 60 * 1000

function timeoutKey(key: string) {
  return `${key}_timeout`
}

function store(key: string, value: boolean) {
  localStorage.setItem(key, JSON.stringify(value))
  localStorage.setItem(timeoutKey(key), String(Date.now()))
  return value
}

async function retrieve(
  key: string,
  retrievalFunction: () => Promise<boolean>,
  timeout = DEFAULT_TIMEOUT,
): Promise<boolean> {
  console.log('Running retrieve')
  const ts = localStorage.getItem(timeoutKey(key))
  const data = localStorage.getItem(key)

  if (!ts || Date.now() - +ts > timeout || !data) {
    const value = await retrievalFunction()
    store(key, value)
    return value
  }

  console.log('Loading from cache')

  return JSON.parse(data)
}

async function parseLaikaResponse(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type')

  if (!contentType || !contentType.startsWith('application/json')) {
    throw new Error(
      `expected content-type to be application/json, got: ${contentType}`,
    )
  }

  return res.json()
}

async function getLaikaFeatureStatus(
  feature: string,
  uri: string,
  env: string,
): Promise<boolean> {
  const laikaUrl = `${uri}/api/features/${feature}/status/${env}`
  const res = await fetch(laikaUrl, {
    method: 'GET',
  })

  if (res.status !== 200) {
    throw new Error(`expected status code 200, got ${res.status}`)
  }

  if (!res.ok) {
    throw new Error('response is not ok')
  }

  const body = await parseLaikaResponse(res)

  if (body === undefined) {
    throw new Error('Response Body is missing')
  }

  return Boolean(body)
}

export async function getFeatureStatus(
  feature: string,
  uri: string,
  env: string,
): Promise<boolean> {
  return retrieve(
    feature,
    () => getLaikaFeatureStatus(feature, uri, env),
    1.5 * 60 * 1000,
  )
}
