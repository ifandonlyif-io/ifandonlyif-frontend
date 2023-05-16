import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { refreshToken } from '@/backend'
import { LSK_ACCESS_TOKEN, LSK_REFRESH_TOKEN } from '@/constants'

export function useRefreshToken() {
  const [refreshToken_] = useLocalStorageState<string>(LSK_REFRESH_TOKEN)
  const [, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const refresh = React.useCallback(async () => {
    if (!refreshToken_) return
    const accessToken = await refreshToken(refreshToken_)
    if (!accessToken) return
    setAccessToken(accessToken)
  }, [refreshToken_, setAccessToken])

  return refresh
}
