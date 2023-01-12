import type { ErrorCode } from '@ethersproject/logger'

export interface EthersError extends Error {
  reason?: string
  code?: ErrorCode
  method?: string
}

export interface MetaMaskError {
  message?: string
  code?: number
}

export function isEthersError(error: unknown): error is EthersError {
  if (
    typeof error === 'object' &&
    error &&
    'reason' in error &&
    'code' in error &&
    'message' in error
  ) {
    return true
  }
  return false
}
