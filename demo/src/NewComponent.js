import React from 'react'
import { string } from 'prop-types'

export default function NewComponent({ text }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        lineHeight: '50px',
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  )
}

NewComponent.propTypes = {
  text: string.isRequired,
}
