import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import { getFeatureStatus } from './utils'

export default class Laika extends Component {
  componentDidMount() {
    const { feature, url, env } = this.props
    getFeatureStatus(feature, url, env)
      .then((status) => {
        this.setState({ [feature]: status })
      })
  }

  render() {
    const { onTrue, onFalse, feature } = this.props
    const flag = this.state ? this.state[feature] : false

    return (
      <div>
        { flag ? onTrue : onFalse }
      </div>
    )
  }
}

Laika.propTypes = {
  url: string.isRequired,
  env: string.isRequired,
  feature: string.isRequired,
  onTrue: shape({}).isRequired,
  onFalse: shape({}).isRequired,
}
