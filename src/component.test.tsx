import { mount } from '@cypress/react'
import { Laika } from 'lib/component'
import { Config, LaikaContext } from 'lib/config'
import { mockRequest } from 'lib/mock/mockRequest'
import { cy, describe, it } from 'local-cypress'
import React from 'react'

describe('component', () => {
  const uri = 'https://laika.example.com'

  it('with-parameters', () => {
    mockRequest('component-test', uri, 'test', true)

    mount(
      <Laika
        feature="component-test"
        uri={uri}
        env="test"
        onTrue={<div>Enabled</div>}
        onFalse={<div>Disabled</div>}
      />,
    )
    cy.get('div').contains('Enabled')
  })

  it('with-parameters-disabled', () => {
    mockRequest('component-test', uri, 'test', false)

    mount(
      <Laika
        feature="component-test"
        uri={uri}
        env="test"
        onTrue={<div>Enabled</div>}
        onFalse={<div>Disabled</div>}
      />,
    )
    cy.get('div').contains('Disabled')
  })

  it('with-context', () => {
    mockRequest('component-test', uri, 'test', true)

    const ctx: Config = {
      env: 'test',
      uri,
    }

    mount(
      <LaikaContext.Provider value={ctx}>
        <Laika
          feature="component-test"
          onTrue={<div>Enabled</div>}
          onFalse={<div>Disabled</div>}
        />
      </LaikaContext.Provider>,
    )
    cy.get('div').contains('Enabled')
  })
})
