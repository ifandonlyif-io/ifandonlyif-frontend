const path = require('path')

module.exports = {
  stories: ['../components/**/index.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: { implementation: require('postcss') },
      },
    },
  ],
  framework: '@storybook/react',
  core: { builder: 'webpack5' },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']
    config.resolve.fallback = {
      'events': require.resolve('events/'),
      'assert': require.resolve('assert/'),
      'path': require.resolve('path-browserify'),
      'util': require.resolve('util/')
    }
    return config
  },
}
