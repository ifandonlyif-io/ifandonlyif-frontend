// @ts-check

/**
 * @template {Pick<import('next').NextConfig, 'i18n'>} T
 * @param {T} config - A generic parameter that flows through to the return type
 */
function defineI18nConfig(config) {
  return config
}

/** @type {Pick<import('next').NextConfig, 'i18n'>} */
module.exports = defineI18nConfig({
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },
  nsSeparator: '::',
})
