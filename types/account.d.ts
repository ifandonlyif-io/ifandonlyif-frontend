import type { JWTPayload } from 'jose'

import type { RemoveIndex } from './utils'

export type AccountAccessTokenJWTPayload = RemoveIndex<JWTPayload> & {
  id: number
  username: string | null
  wallet: string
}

export type PreviouslyConnectedWallet = {
  label: string
  account: string
}
