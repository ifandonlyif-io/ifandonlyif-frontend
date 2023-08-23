// @ts-check

/**
 * @param {import('next').NextConfig} config - Next.js configuration
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix @walletconnect/legacy-client build error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },
})
