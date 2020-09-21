import React from 'react'
import Laika, { getFeatureStatus } from 'laika-react'
import NewComponent from './NewComponent'
import OldComponent from './OldComponent'

export default function App() {
  const env = 'dev'
  const uri = 'http://example.com'

  // Mock fetch responses
  const mockFetch = (uri) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const init = {
      headers,
      status: 200,
    }
    const resTrue = new Response(true, init)
    const resFalse = new Response(false, init)

    if (uri.includes('NEW_FORM')) {
      return Promise.resolve(resTrue)
    } if (uri.includes('NEW_BUTTON')) {
      return Promise.resolve(resFalse)
    } if (uri.includes('NEW_ALERT')) {
      return Promise.resolve(resTrue)
    }
    return Promise.reject(resTrue)
  }

  // Set global fetch to mockFetch function
  global.fetch = mockFetch

  getFeatureStatus('NEW_ALERT', uri, env).then(status => {
    if (status) console.log('NEW_ALERT is enabled')
  })

  return (
    <div>
      <h2>Laika React Component Demo</h2>
      <div style={{ display: 'flex' }}>
        <Laika
          uri={uri}
          feature="NEW_FORM"
          env={env}
          onTrue={(
            <NewComponent
              text="True"
            />
          )}
          onFalse={(
            <OldComponent
              text="False"
            />
          )}
        />
        <Laika
          uri={uri}
          feature="NEW_BUTTON"
          env={env}
          onTrue={(
            <NewComponent
              text="True"
            />
          )}
          onFalse={(
            <OldComponent
              text="False"
            />
          )}
        />
        <Laika
          uri={uri}
          feature="NEW_INPUT"
          env={env}
          onTrue={(
            <NewComponent
              text="True"
            />
          )}
          onFalse={(
            <OldComponent
              text="False"
            />
          )}
        />
      </div>
    </div>
  )
}
