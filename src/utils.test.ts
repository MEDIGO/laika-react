import { cy, describe, it } from 'local-cypress'
import { mockRequest } from 'lib/mock/mockRequest'
import { getFeatureStatus } from 'lib/utils'

describe('Utilities', () => {
  describe('getFeatureStatus', () => {
    it('acts on false', () => {
      mockRequest('cache-test', '', 'test', false)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        .should('eq', false)
    })

    it('acts on true', () => {
      mockRequest('cache-test', '', 'test', true)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        .should('eq', true)
    })

    it('caches the flag', () => {
      cy.clock()
      mockRequest('cache-test', '', 'test', true)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        .should('eq', true)
      cy.tick(60 * 1000)
      mockRequest('cache-test', '', 'test', false)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        // The cached result should still be the old data
        .should('eq', true)
      cy.tick(60 * 1000)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        // The timeout is 1.5 minutes so it should now be yielding the new route
        .should('eq', false)
    })
  })
})
