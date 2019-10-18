import React from 'react'
import { string } from 'prop-types'

export default function OldComponent({ text }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        lineHeight: '50px',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  )
}

OldComponent.propTypes = {
  text: string.isRequired,
}
