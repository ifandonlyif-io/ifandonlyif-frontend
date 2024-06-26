import React from 'react'

import { refreshToken as refreshTokenApi } from '@/backend'
import { getRefreshTokenPayload, isTokenExpired } from '@/utils'

import { useTokenStorage } from './use-token-storage'

export function useRefreshToken() {
  const { refreshToken, setAccessToken } = useTokenStorage()

  const isExpired = React.useMemo<boolean>(() => {
    if (!refreshToken) return true
    const payload = getRefreshTokenPayload(refreshToken)
    const expired = isTokenExpired(payload)
    console.debug('useRefreshToken::isExpired', expired, payload.exp)
    return expired
  }, [refreshToken])

  const refresh = React.useCallback(async () => {
    if (!refreshToken) return
    const accessToken = await refreshTokenApi(refreshToken)
    if (!accessToken) return
    setAccessToken(accessToken)
    return accessToken
  }, [refreshToken, setAccessToken])

  return { isExpired, refresh }
}
