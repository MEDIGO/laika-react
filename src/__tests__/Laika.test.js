import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'node-fetch'
import Laika from '../Laika'

global.fetch = fetch

describe('basic test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Laika
        url="http://example.com"
        env="dev"
        feature="TEST_FEATURE"
        onTrue={<div />}
        onFalse={<div />}
      />,
      div,
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
