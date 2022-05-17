import { useContext, useEffect, useRef, useState } from 'react'
import { LaikaContext } from './config'
import { DEFAULT_TIMEOUT, getFeatureStatus, loadCached } from './utils'

type LaikaState = {
  enabled: boolean
  loading: boolean
}

export function useLaika(
  feature: string,
  uri?: string,
  env?: string,
  cacheTimeout?: number,
): [boolean, boolean] {
  const config = useContext(LaikaContext)

  const _uri = uri ?? config.uri
  const _env = env ?? config.env
  const _to = cacheTimeout ?? config.timeout ?? DEFAULT_TIMEOUT

  if (_uri === undefined || _env === undefined || _to === undefined) {
    throw new Error(
      `Laika App not initialized (uri: ${_uri}, env: ${_env}, timeout: ${_to})`,
    )
  }

  const [state, setState] = useState<LaikaState>(() => {
    const cached = loadCached(feature, _env, cacheTimeout)

    if (cached !== undefined) {
      return {
        enabled: cached,
        loading: false,
      }
    }

    return {
      enabled: false,
      loading: true,
    }
  })

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    if (state.loading) {
      getFeatureStatus(feature, _uri, _env, _to).then((isEnabled) => {
        if (isMounted.current) {
          setState({
            enabled: isEnabled,
            loading: false,
          })
        }
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [])

  return [state.enabled, state.loading]
}
