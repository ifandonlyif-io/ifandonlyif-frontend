import * as Jose from 'jose'

import type { AccessTokenJWTPayload } from '../types'
import { isHistorical } from './date-time'

export function getAccessTokenPayload(token: string): AccessTokenJWTPayload {
  return Jose.decodeJwt(token) as AccessTokenJWTPayload
}

export function getRefreshTokenPayload(token: string): Jose.JWTPayload {
  return Jose.decodeJwt(token)
}

export function isTokenExpired(payload: Jose.JWTPayload): boolean {
  if (!payload.exp) return true
  const expired = isHistorical(payload.exp)
  console.debug('Is token expired', expired, payload.exp)
  if (expired) return true
  return false
}
