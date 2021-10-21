import { createContext } from 'react'

export interface Config {
  uri?: string
  env?: string
  timeout?: number
}

export const LaikaContext = createContext({} as Config)
LaikaContext.displayName = 'Laika'
