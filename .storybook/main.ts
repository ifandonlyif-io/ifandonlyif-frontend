import type { StorybookConfig } from '@storybook/nextjs'
import path from 'node:path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ['../components/**/index.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...(config.resolve?.plugins || []),
          new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, '../tsconfig.json'),
            baseUrl: path.resolve(__dirname, '../'),
          })
        ],
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
        }
      }
    }
    return config
  }
}
export default config
