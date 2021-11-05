import { useContext, useEffect, useRef, useState } from 'react'
import { LaikaContext } from './config'
import { DEFAULT_TIMEOUT, getFeatureStatus } from './utils'

export function useLaika(
  feature: string,
  uri?: string,
  env?: string,
  cacheTimeout?: number,
): [boolean, boolean] {
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const config = useContext(LaikaContext)

  const _uri = uri ?? config.uri
  const _env = env ?? config.env
  const _to = cacheTimeout ?? config.timeout ?? DEFAULT_TIMEOUT

  if (_uri === undefined || _env === undefined || _to === undefined) {
    throw new Error(
      `Laika App not initialized (uri: ${_uri}, env: ${_env}, timeout: ${_to})`,
    )
  }

  const isMounted = useRef(false)

  getFeatureStatus(feature, _uri, _env, _to).then((isEnabled) => {
    if (isMounted.current) {
      setIsLoading(false)
      setEnabled(isEnabled)
    }
  })

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return [enabled, isLoading]
}
