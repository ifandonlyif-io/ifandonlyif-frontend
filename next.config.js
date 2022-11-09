/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  i18n,
}
