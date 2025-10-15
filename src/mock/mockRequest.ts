export function mockRequest(
  feature: string,
  uri: string,
  env: string,
  enabled: boolean,
) {
  return cy.intercept(`${uri}/api/features/${feature}/status/${env}`, {
    statusCode: 200,
    body: JSON.stringify(enabled),
    headers: {
      'content-type': 'application/json',
    },
    delay: 500,
  })
}
