// @ts-check

import path from 'node:path'

/**
 * @template {import('lint-staged').Config} T
 * @param {T} config - A generic parameter that flows through to the return type
 */
function defineLintStagedConfig(config) {
  return config
}

export default defineLintStagedConfig({
  '**/*.(ts|tsx|js|jsx|mjs|cjs)': (filenames) =>
    `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`,

  '**/*.(md|json|html|yml|yaml)': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
})
