import { getFeatureStatus, useLaika, LaikaContext, Laika } from './index'

describe('Index exports', () => {
  it('should export all main functions and components', () => {
    // Test that all main exports are available
    expect(typeof getFeatureStatus).to.equal('function')
    expect(typeof useLaika).to.equal('function')
    expect(typeof LaikaContext).to.equal('object')
    expect(typeof Laika).to.equal('function')
  })
})
