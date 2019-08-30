import React, { useState, useEffect } from 'react'
import { shape, string } from 'prop-types'
import { retrieve } from './utils'

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


export default function Laika({ url, env, feature, onTrue, onFalse }) {
  const [status, setStatus] = useState(false)

  useEffect(async () => {
    const getFeatureStatus = feature => Promise.resolve(retrieve(
      feature,
      () => getLaikaFeatureStatus(feature),
      1.5 * 60 * 1000,
    ))

    const _status = await getFeatureStatus(feature)
    setStatus(_status)
  },[])

  const getLaikaFeatureStatus = async (feature) => {
    const laikaUrl = `${url}/api/features/${feature}/status/${env}`

    try {
      const res = await fetch(laikaUrl)

      if (res.status !== 200) return false

      return res === true
    } catch {
      return false
    }
  }

  return (
    <div>
      { status ? onTrue : onFalse }
    </div>
  )
}

Laika.propTypes = {
  url: string.isRequired,
  env: string.isRequired,
  feature: string.isRequired,
  onTrue: shape({}).isRequired,
  onFalse: shape({}).isRequired,
}
