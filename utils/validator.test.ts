import { describe, expect, test } from 'vitest'

import { validateUrlIsHttp, validateUrlNotContainUserInfo } from './validator'

describe('Test validateUrlIsHttp function', () => {
  test('validateUrlIsHttp should return true for http url', () => {
    const url = new URL('http://www.google.com')
    expect(validateUrlIsHttp(url)).toBe(true)
  })

  test('validateUrlIsHttp should return true for https url', () => {
    const url = new URL('https://www.google.com')
    expect(validateUrlIsHttp(url)).toBe(true)
  })

  test('validateUrlIsHttp should return false for ftp url', () => {
    const url = new URL('ftp://www.google.com')
    expect(validateUrlIsHttp(url)).toBe(false)
  })
})

describe('Test validateUrlNotContainUserInfo function', () => {
  test('validateUrlNotContainUserInfo should return true for url without userinfo', () => {
    const url = new URL('https://www.google.com')
    expect(validateUrlNotContainUserInfo(url)).toBe(true)
  })

  test('validateUrlNotContainUserInfo should return false for url with userinfo', () => {
    const url = new URL('https://user:pass@localhost')
    expect(validateUrlNotContainUserInfo(url)).toBe(false)
  })
})
