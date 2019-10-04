import React from 'react'
import Laika from 'laika-react'

export default function App() {
  return (
    <div>
      <h2>Laika React Component Demo</h2>
      <Laika
        url="https://laika.medigo.com"
        feature="TP5712_NEW_B2B_FORM"
        env="dev"
        onTrue={<div style={{ width: 50, height: 50, backgroundColor: 'red' }} />}
        onFalse={<div style={{ width: 50, height: 50, backgroundColor: 'blue' }} />}
      />
    </div>
  )
}
