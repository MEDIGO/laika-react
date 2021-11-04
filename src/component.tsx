import { bool, node, number, oneOfType, string } from 'prop-types'
import React from 'react'
import { useLaika } from './hook'

export interface LaikaProps {
  feature: string
  env?: string
  uri?: string
  cacheTimeout?: number
  onTrue: React.ReactElement | false
  onFalse: React.ReactElement | false
}

export function Laika(props: LaikaProps) {
  const [featureEnabled, featureIsLoading] = useLaika(
    props.feature,
    props.uri,
    props.env,
    props.cacheTimeout,
  )

  const children = featureEnabled ? props.onTrue : props.onFalse
  return <>{!featureIsLoading && children}</>
}

// For using it with JavaScript
Laika.propTypes = {
  feature: string.isRequired,
  uri: string,
  env: string,
  cacheTimeout: number,
  onTrue: oneOfType([node, bool]).isRequired,
  onFalse: oneOfType([node, bool]).isRequired,
}
