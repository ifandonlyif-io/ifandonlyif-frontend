// @ts-check

import i18next from './next-i18next.config.cjs'

/**
 * @param {import('next').NextConfig} config - Next.js configuration
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  reactStrictMode: true,
  output: 'standalone',
  i18n: i18next.i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix @walletconnect/legacy-client build error
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
})
