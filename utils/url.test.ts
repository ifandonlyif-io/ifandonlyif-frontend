import { describe, expect, test } from 'vitest'

import { parseUrl } from './url'

describe('Test parseUrl function', () => {
  test('parseUrl should return the correct url', () => {
    expect(parseUrl('https://www.google.com')).toBe('https://www.google.com')
  })

  test('parseUrl should return the correct url when path is provided', () => {
    expect(parseUrl('https://www.google.com/search')).toBe(
      'https://www.google.com'
    )
  })

  test('parseUrl should return the correct url when path and query are provided', () => {
    expect(parseUrl('https://www.google.com/search?q=hello')).toBe(
      'https://www.google.com'
    )
  })

  test('parseUrl should return the correct url when path, query and hash are provided', () => {
    expect(parseUrl('https://www.google.com/search?q=hello#test')).toBe(
      'https://www.google.com'
    )
  })

  test('parseUrl should return the correct url when path, query, hash and port are provided', () => {
    expect(parseUrl('https://www.google.com:8080/search?q=hello#test')).toBe(
      'https://www.google.com'
    )
  })
})
