import { mount } from '@cypress/react'
import React from 'react'
import { Config, LaikaContext } from './config'
import { useLaika } from './hook'
import { mockRequest } from './mock/mockRequest'

describe('useLaika', () => {
  const uri = 'https://laika.example.com'

  it('throws error when not properly initialized', () => {
    function TestComp() {
      // This should throw an error because uri/env are undefined
      const [flag] = useLaika('error-test')
      return <div>{flag ? 'Enabled' : 'Disabled'}</div>
    }

    // Cypress will catch the error thrown by the hook
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Laika App not initialized')
      return false // prevents Cypress from failing the test
    })

    mount(<TestComp />)
  })

  it('with-parameters', () => {
    mockRequest('useLaika-test', uri, 'test', true)

    function TestComp() {
      const [flag] = useLaika('useLaika-test', uri, 'test')

      return <div>{flag ? 'Enabled' : 'Disabled'}</div>
    }

    mount(<TestComp />)
    cy.get('div').contains('Enabled')
  })

  it('with-parameters-disabled', () => {
    mockRequest('useLaika-test', uri, 'test', false)

    function TestComp() {
      const [flag] = useLaika('useLaika-test', uri, 'test')

      return <div>{flag ? 'Enabled' : 'Disabled'}</div>
    }

    mount(<TestComp />)
    cy.get('div').contains('Disabled')
  })

  it('with-context', () => {
    mockRequest('useLaika-test', uri, 'test', true)

    function TestComp() {
      const [flag] = useLaika('useLaika-test')

      return <div>{flag ? 'Enabled' : 'Disabled'}</div>
    }

    const ctx: Config = {
      env: 'test',
      uri,
    }

    mount(
      <LaikaContext.Provider value={ctx}>
        <TestComp />
      </LaikaContext.Provider>,
    )
    cy.get('div').contains('Enabled')
  })
})
