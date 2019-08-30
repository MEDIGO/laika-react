const DEFAULT_TIMEOUT = 60 * 60 * 1000

export const timeoutKey = (key) => `${key}_timeout`

export function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  localStorage.setItem(timeoutKey(key), Date.now())
  return value
}

export function retrieve(key, retrievalFunction, timeout = DEFAULT_TIMEOUT) {
  const ts = localStorage.getItem(timeoutKey(key)) || new Date('1970-1-1').getTime()

  if (ts && (Date.now() - ts) > timeout) {
    return retrievalFunction()
      .then((response) => store(key, response))
      .catch(() => {
      // fail silently
      })
  }
  return JSON.parse(localStorage.getItem(key))
}
