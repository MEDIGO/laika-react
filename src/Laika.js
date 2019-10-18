import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import {
  shape, string, func, oneOfType,
} from 'prop-types'
import { getFeatureStatus } from './utils'

export default class Laika extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      fetched: false,
    }
  }

  componentDidMount() {
    const { feature, uri, env } = this.props

    this.setState({ loading: true })

    getFeatureStatus(feature, uri, env)
      .then((status) => this.setState({ [feature]: status }))
      .catch(() => this.setState({ [feature]: false }))
      .finally(() => this.setState({ loading: false, fetched: true }))
  }

  render() {
    const { loading, fetched } = this.state
    const { onTrue, onFalse, feature } = this.props
    const Children = (this.state && this.state[feature]) ? onTrue : onFalse

    return (
      <div>
        { (!loading && fetched) && Children}
      </div>
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
