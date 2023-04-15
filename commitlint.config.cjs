// @ts-check

/**
 * @template {import('@commitlint/types').UserConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 */
function defineCommitLintConfig(config) {
  return config
}

module.exports = defineCommitLintConfig({
  extends: ['@commitlint/config-conventional'],
})
