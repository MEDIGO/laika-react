import React from 'react'
import Laika from 'laika-react'
import NewComponent from './NewComponent'
import OldComponent from './OldComponent'

export default function App() {
  const env = 'dev'

  // Mock fetch responses
  const mockFetch = (url) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const init = {
      headers,
      status: 200,
    }
    const resTrue = new Response(true, init)
    const resFalse = new Response(false, init)

    if (url.includes('NEW_FORM')) {
      return Promise.resolve(resTrue)
    } if (url.includes('NEW_BUTTON')) {
      return Promise.resolve(resFalse)
    }
    return Promise.reject(resTrue)
  }

  // Set global fetch to mockFetch function
  global.fetch = mockFetch

  return (
    <div>
      <h2>Laika React Component Demo</h2>
      <div style={{ display: 'flex' }}>
        <Laika
          url="http://example.com"
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
          url="http://example.com"
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
          url="http://example.com"
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
