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
    return config
  },
}
