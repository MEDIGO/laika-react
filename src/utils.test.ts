import { mockRequest } from './mock/mockRequest'
import { getFeatureStatus } from './utils'

describe('Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()
  })

  describe('getFeatureStatus', () => {
    it('acts-on-false', () => {
      mockRequest('cache-test', '', 'test', false)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        .should('eq', false)
    })

    it('acts-on-true', () => {
      mockRequest('cache-test', '', 'test', true)
        .then(() => getFeatureStatus('cache-test', '', 'test'))
        .should('eq', true)
    })

    it('handles network errors gracefully', () => {
      // Mock a failing request
      cy.intercept('/api/features/error-test/status/test', {
        statusCode: 500,
      }).as('errorRequest')

      cy.then(() => getFeatureStatus('error-test', '', 'test')).should(
        'eq',
        false,
      )
    })

    it('handles invalid JSON responses', () => {
      // Mock a response with invalid JSON
      cy.intercept('/api/features/invalid-json/status/test', {
        statusCode: 200,
        body: 'invalid json',
      }).as('invalidJson')

      cy.then(() => getFeatureStatus('invalid-json', '', 'test')).should(
        'eq',
        false,
      )
    })

    it('handles corrupted localStorage data', () => {
      // Set corrupted data in localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('laika:corrupt-test:test', 'invalid json')
      })

      mockRequest('corrupt-test', '', 'test', true)
        .then(() => getFeatureStatus('corrupt-test', '', 'test'))
        .should('eq', true)
    })

    it('handles missing localStorage data', () => {
      // Ensure localStorage is empty
      cy.clearLocalStorage()

      mockRequest('missing-cache', '', 'test', true)
        .then(() => getFeatureStatus('missing-cache', '', 'test'))
        .should('eq', true)
    })

    it('caches-the-flag', () => {
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
