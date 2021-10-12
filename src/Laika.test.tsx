import { cy, describe, it } from 'local-cypress'
import React from 'react'
import { mount } from '@cypress/react'
import { Laika } from './Laika'
import { mockRequest } from './mock/mockRequest'

describe('Laika Component', () => {
  it('reacts to enabled', () => {
    mockRequest('test-feature', '', 'prod', true)

    mount(
      <Laika
        disabled={<div>Disabled!</div>}
        enabled={<div>Enabled!</div>}
        uri=""
        env="prod"
        feature="test-feature"
      />,
    )
    cy.get('div').contains('Enabled!')
  })

  it('reacts to disabled', () => {
    mockRequest('test-feature', '', 'prod', false)

    mount(
      <Laika
        disabled={<div>Disabled!</div>}
        enabled={<div>Enabled!</div>}
        uri=""
        env="prod"
        feature="test-feature"
      />,
    )
    cy.get('div').contains('Disabled!')
  })
})
