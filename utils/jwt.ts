import * as Jose from 'jose'

import type { AccessTokenJWTPayload } from '../types'
import { isHistorical } from './date-time'

export function getAccessTokenPayload(token: string): AccessTokenJWTPayload {
  return Jose.decodeJwt(token) as AccessTokenJWTPayload
}

export function isAccountTokenExpired(token: string): boolean {
  const payload = getAccessTokenPayload(token)
  if (!payload.exp) return true
  const expired = isHistorical(payload.exp)
  console.debug('Is account token expired', payload.exp)
  if (expired) return true
  return false
}
