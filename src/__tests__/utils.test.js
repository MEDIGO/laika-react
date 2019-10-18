import 'core-js/stable'
import 'regenerator-runtime/runtime'
import fetch from 'node-fetch'
import {
  store, retrieve, parse, getLaikaFeatureStatus,
} from '../utils'
import { LocalStorageMock } from '../../mock'

global.Headers = fetch.Headers
global.Response = fetch.Response
global.localStorage = new LocalStorageMock()

describe('store tests', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('sets items in localStorage', () => {
    const key = 'NEW_COMPONENT'
    const value = true
    store(key, value)

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value))
    expect(localStorage.getItem(`${key}_timeout`)).not.toBe(null)
  })
})

describe('retrieve tests', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('returns key value if it has not timed out', () => {
    const timeout = Date.now()
    const key = 'NEW_COMPONENT'
    const value = true
    const retrievalFunction = jest.fn()

    localStorage.setItem(key, JSON.stringify(value))
    localStorage.setItem(`${key}_timeout`, timeout)

    const returnedValue = retrieve(key, retrievalFunction)
    expect(returnedValue).toEqual(value)
    expect(retrievalFunction).toBeCalledTimes(0)
  })

  it('reruns retrieve function if value has timed out', async () => {
    const key = 'NEW_COMPONENT'
    const timeout = new Date('1970-1-1').getTime()
    const value = true
    const newValue = false
    const retrievalFunction = jest.fn().mockResolvedValue(newValue)

    localStorage.setItem(key, JSON.stringify(value))
    localStorage.setItem(`${key}_timeout`, timeout)

    const returnedValue = await retrieve(key, retrievalFunction)
    expect(returnedValue).toEqual(newValue)
    expect(retrievalFunction).toBeCalledTimes(1)
  })
})

describe('parse tests', () => {
  it('returns null if no content-headers', () => {
    const headers = new Headers()
    let response = new Response(true, {})

    let value = parse(response)
    expect(value).toEqual(null)

    headers.append('Content-Type', 'application/json')
    response = new Response(true, { headers })

    value = parse(response)
    // Parse returns response.json(), which is a promise
    expect(value).toEqual(Promise.resolve())
  })
})

describe('getLaikaFeatureTests', () => {
  const feature = 'NEW_COMPONENT'
  const uri = 'http://example.com'
  const env = 'dev'

  const mockFetch = (status, body, ok) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return jest.fn().mockImplementationOnce(
      () => new Promise((resolve) => {
        resolve({
          ok,
          status,
          headers,
          json: () => Promise.resolve((body)),
        })
      }),
    )
  }

  it('returns true body json', async () => {
    const status = 200
    const body = true
    global.fetch = mockFetch(status, body, true)

    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(true)
  })

  it('returns false body json', async () => {
    const status = 200
    const body = false
    global.fetch = mockFetch(status, body, true)

    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(false)
  })

  it('returns false if status is not 200', async () => {
    const status = 404
    const body = true
    global.fetch = mockFetch(status, body, true)

    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(false)
  })

  it('returns false if no body', async () => {
    const status = 200
    const body = true
    const headers = new Headers()

    // No content-type in headers makes parse return null
    global.fetch = jest.fn().mockImplementationOnce(
      () => new Promise((resolve) => {
        resolve({
          ok: true,
          status,
          headers,
          json: () => Promise.resolve((body)),
        })
      }),
    )

    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(false)
  })

  it('returns false if ok is false', async () => {
    const status = 200
    const body = true
    const ok = false
    global.fetch = mockFetch(status, body, ok)

    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(false)
  })

  it('returns false on err', async () => {
    global.fetch = jest.fn().mockRejectedValue({})
    const laikaStatus = await getLaikaFeatureStatus(feature, uri, env)
    expect(laikaStatus).toEqual(false)
  })
})
