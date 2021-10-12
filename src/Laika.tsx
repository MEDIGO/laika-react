import React from 'react'
import { getFeatureStatus } from './utils'

export interface LaikaProps {
  feature: string
  uri: string
  env: string
  enabled: React.ReactElement | false
  disabled: React.ReactElement | false
}

export function Laika(props: LaikaProps) {
  const [loading, setLoading] = React.useState(false)
  const [fetched, setFetched] = React.useState(false)
  const [status, setStatus] = React.useState(false)

  const { feature, uri, env, enabled, disabled } = props

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const s = await getFeatureStatus(feature, uri, env)
        setStatus(s)
      } catch (err) {
        setStatus(false)
      } finally {
        setLoading(false)
        setFetched(true)
      }
    }

    fetchData()
  }, [env, feature, uri])

  const children = status ? enabled : disabled

  return <>{!loading && fetched && children}</>
}
