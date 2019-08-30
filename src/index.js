import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import { parse } from 'utils/requests'
import { retrieve } from 'utils/localStorage'
import config from 'config'

const getLaikaFeatureStatus = (feature) => {
  const opts = {
    method: 'GET',
  }
  const laikaUrl = `${config.LAIKA_ADDR}/api/features/${feature}/status/${config.LAIKA_ENV}`
  return fetch(laikaUrl, opts)
    .then((res) => {
      const body = parse(res)

      if (res.status !== 200) {
        return false
      }

      if (!body) return false
      return body.then((json) => (res.ok ? json : Promise.reject(json)))
    })
    .catch(() => false)
}

const getFeatureStatus = (feature) => Promise.resolve(retrieve(
  feature,
  () => getLaikaFeatureStatus(feature),
  1.5 * 60 * 1000,
))

export default class Laika extends Component {
  componentDidMount() {
    getFeatureStatus(this.props.feature)
      .then((status) => {
        this.setState({ [this.props.feature]: status })
      })
  }

  render() {
    const flag = this.state ? this.state[this.props.feature] : false
    const { onTrue, onFalse } = this.props
    return (
      <div>
        { flag ? onTrue : onFalse }
      </div>
    )
  }
}

Laika.propTypes = {
  feature: string.isRequired,
  onTrue: shape({}).isRequired,
  onFalse: shape({}).isRequired,
}
