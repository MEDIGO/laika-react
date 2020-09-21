# laika-react
laika-react is an NPM package that connects React applications with the Laika feature flag service (https://github.com/MEDIGO/laika)

## Installation and Usage

Install laika-react with yarn or npm

```
yarn add laika-react
```

or

```
npm install laika-react
```

Then import it into your React app

```
import React from 'react'
import Laika from 'laika-react'
import NewComponent from './NewComponent'
import OldComponent from './OldComponent'

export default function App() {
  return (
    <div>
        <Laika
            uri='http://example.com'
            feature='NEW_COMPONENT'
            env='dev'
            onTrue={<NewComponent />}
            onFalse={<OldComponent />}
        />
    </div>
  )
}
```

## Props

- `uri` - The uri for the call to the laika server
- `feature` - The name of the feature on the laika server
- `env` - The environment of the React component
- `onTrue` - The new feature component to be rendered when laika returns true
- `onFalse` - The old component to be rendered when laika returns false

## getFeatureStatus
laika-react also exposes `getFeatureStatus(feature: string, uri: string, env: string): Promise<bool>`.
This allows different conditions to be run based on the feature's status instead of just rendering React components. e.g.

```
import { getFeatureStatus } from 'laika-react'

getFeatureStatus('NEW_FEATURE', 'http://example.com', 'prod')
  .then(status => {
    if (status) {
      console.log('feature enabled')
    }
  })
```

## Demo
To try out the laika-react demo

`cd demo`
`yarn install`
`yarn start`

and the demo will be available at `http://localhost:3000/`

## License

MIT Licensed. Copyright (c) Medigo GmbH 2019.
