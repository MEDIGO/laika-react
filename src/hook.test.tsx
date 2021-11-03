import { mount } from '@cypress/react'
import { Config, LaikaContext } from 'lib/config'
import { useLaika } from 'lib/hook'
import { mockRequest } from 'lib/mock/mockRequest'
import { cy, describe, it } from 'local-cypress'
import React from 'react'

describe('useLaika', () => {
  const uri = 'https://laika.example.com'

  it('with-parameters', () => {
    mockRequest('useLaika-test', uri, 'test', true)

    function TestComp() {
      const [flag] = useLaika('useLaika-test', uri, 'test')

      return <div>{flag ? 'Enabled' : 'Disabled'}</div>
    }

    mount(<TestComp />)
    cy.get('div').contains('Enabled')
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
