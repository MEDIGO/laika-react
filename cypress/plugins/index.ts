// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { Cypress } from 'local-cypress'
import { startDevServer } from '@cypress/webpack-dev-server'
import webpack from 'webpack'

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  if (config.testingType === 'component') {
    const webpackConfig: webpack.Configuration = {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    }

    on('dev-server:start', (options) =>
      startDevServer({ options, webpackConfig }),
    )
  }
  return config
}

// eslint-disable-next-line import/no-default-export
export default pluginConfig
