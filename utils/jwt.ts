import * as Jose from 'jose'

import { AccountAccessTokenJWTPayload } from '../types'

export function getAccessTokenPayload(
  token: string
): AccountAccessTokenJWTPayload {
  return Jose.decodeJwt(token) as AccountAccessTokenJWTPayload
}

export function isAccountTokenExpired(token: string): boolean {
  const payload = getAccessTokenPayload(token)
  const now = Date.now()
  console.debug('Is account token expired', payload.exp, now)
  if (!payload.exp || payload.exp * 1000 <= now) return true
  return false
}
