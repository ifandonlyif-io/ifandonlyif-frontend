import type { JWTPayload } from 'jose'

import type { RemoveIndex } from './utils'

export type AccessTokenJWTPayload = RemoveIndex<JWTPayload> & {
  id: number
  username: string | null
  wallet: string
}

export type UserInfo = AccessTokenJWTPayload
