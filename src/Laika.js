import React, { useState, useEffect } from 'react'
import { shape, string } from 'prop-types'
import { retrieve } from './utils'

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
