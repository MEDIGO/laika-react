# laika-react
This NPM package connects React applications with the Laika feature flag service (https://github.com/MEDIGO/laika)

## Installation

Yarn:

```
yarn add laika-react
```

npm:

```
npm install -S laika-react
```

## Usage

### React Hook

#### Without context:

```tsx
import React from 'react'
import { useLaika } from 'laika-react'
/* ... import your components ... */

const uri = 'https://laika.example.com'
const env = 'prod'

function SomeComponent() {
  const [featureNewComponent] = useLaika('new-component', uri, env)

  return (
    <div>
      {featureNewComponent ? <NewComponent /> : <OldComponent />}
    </div>
  )
}
```

#### With context:

```tsx
import React from 'react'
import { useLaika, Config, LaikaContext } from 'laika-react'
/* ... import your components ... */

const ctx: Config = {
  uri: "https://laika.example.com",
  env: "prod",
  timeout: 60 * 1000, // 1 minute cache timeout
}

function App() {
  return (
    <LaikaContext.Provider value={ctx}>
      <SomeComponent/>
    </LaikaContext.Provider>
  )
}

function SomeComponent() {

  // We can leave out the parameters that we provided in the context
  const [featureNewComponent] = useLaika('new-component')

  return (
    <div>
      {featureNewComponent ? <NewComponent /> : <OldComponent />}
    </div>
  )
}
```

### getFeatureStatus

```ts
import { getFeatureStatus } from 'laika-react'

getFeatureStatus('NEW_FEATURE', 'http://example.com', 'prod')
  .then(status => {
    if (status) {
      console.log('feature enabled')
    }
  })
```

## Notes

* It is strongly recommended to use the ESLint rule `@typescript-eslint/strict-boolean-expressions`, in order to prevent accidentally doing something like this:
  ```ts
  // Oops! Forgot to destructure here!
  const featureNewComponent = useLaika('new-component')
  
  // This will always be true since useLaika returns an array!
  if(featureNewComponent) {
    // ...
  }
  
  // This will always return a promise, so it's always true!
  if(getFeatureStatus('NEW_FEATURE', 'http://example.com', 'prod')) {
    // ...
  }
  ```

## API

### `useLaika` Hook

Fetches a flag from the Laika server and stores it in the components state.

Using a context allows you to skip the servers address and environment parameters and load them from the context instead.

```ts
function useLaika(
  feature: string,
  uri?: string,
  env?: string,
  cacheTimeout?: number,
): [boolean, boolean]
```


Parameter | Function
---|---
`feature`| The name of the feature flag on Laika
`uri` | The uri to the laika service (for example `https://laika.example.com`
`env` | The Laika env (for example `test` or `prod`)
`cacheTimeout` | The time how long a requested flag should be cached (default: 1.5 minutes).<br/>The flags and cache timestamps are saved in localstorage.
***Return values*** |  Returns an array with 2 entries:<br/>1. `state`: The current state of the flag (`true` or `false`, defaults to `false` while the request is still resolving)<br/>2. `isLoading`: The second entry is true if it's still requesting the flag from the server and false if it's finished loading (useful for displaying loading indicators for example)

### `getFeatureStatus` utility function

Retrieves the feature flag from the API and returns a promise that can be `await`ed.

The parameters are the same as in the `useLaika` hook.

```ts
async function getFeatureStatus(
  feature: string,
  uri: string,
  env: string,
  timeout?: number,
): Promise<boolean>
```

## License

MIT Licensed. Copyright (c) Medigo GmbH 2021.
