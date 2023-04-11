import { defineConfig } from 'cypress';
import webpackConfig from './webpack.dev';

export default defineConfig({
  viewportWidth: 860,
  viewportHeight: 1234,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});
