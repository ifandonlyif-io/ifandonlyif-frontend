import * as Jose from 'jose'

import { AccountAccessTokenJWTPayload } from '../types'
import { isHistorical } from './datetime'

export function getAccessTokenPayload(
  token: string
): AccountAccessTokenJWTPayload {
  return Jose.decodeJwt(token) as AccountAccessTokenJWTPayload
}

export function isAccountTokenExpired(token: string): boolean {
  const payload = getAccessTokenPayload(token)
  if (!payload.exp) return true
  const expired = isHistorical(payload.exp)
  console.debug('Is account token expired', payload.exp)
  if (expired) return true
  return false
}
