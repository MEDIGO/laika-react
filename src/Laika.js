import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import {
  shape, string, func, oneOfType,
} from 'prop-types'
import { getFeatureStatus } from './utils'

export { getFeatureStatus }

export default class Laika extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      fetched: false,
    }
  }

  componentDidMount() {
    this._isMounted = true
    const { feature, uri, env } = this.props

    if (this._isMounted) {
      this.setState({ loading: true })
    }

    getFeatureStatus(feature, uri, env)
      .then((status) => {
        if (this._isMounted) {
          this.setState({ [feature]: status })
        }
      })
      .catch(() => {
        if (this._isMounted) {
          this.setState({ [feature]: false })
        }
      })
      .finally(() => {
        if (this._isMounted) {
          this.setState({ loading: false, fetched: true })
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { loading, fetched } = this.state
    const { onTrue, onFalse, feature } = this.props
    const Children = (this.state && this.state[feature]) ? onTrue : onFalse

    return (
      <>
        { (!loading && fetched) && Children}
      </>
    )
  }
}

Laika.propTypes = {
  uri: string.isRequired,
  env: string.isRequired,
  feature: string.isRequired,
  onTrue: oneOfType([func, shape({})]).isRequired,
  onFalse: oneOfType([func, shape({})]).isRequired,
}
