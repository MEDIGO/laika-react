import { context, cy, describe, expect, it } from 'local-cypress'
import { mockRequest } from './mock/mockRequest'
import { getFeatureStatus } from './utils'

describe('Laika utilities', () => {
  // it('gets the true status', async () => {
  //   mockRequest('cache-test', '', 'test', true)
  //   const status = await getFeatureStatus('cache-test', '', 'test')
  //   expect(status).to.equal(true)
  // })
  it('gets the false status', () => {
    mockRequest('cache-test', '', 'test', false)
    cy.wrap(() => getFeatureStatus('cache-test', '', 'test')).should(
      'eq',
      false,
    )
    // .then(() => cy.wrap(getFeatureStatus('cache-test', '', 'test')))
    // .should('eq', false)
  })
})
