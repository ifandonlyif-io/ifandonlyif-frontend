import useLocalStorageState from 'use-local-storage-state'
import useSessionStorageState from 'use-session-storage-state'

import { LSK_REFRESH_TOKEN, SSK_ACCESS_TOKEN } from '@/constants'

export function useTokenStorage() {
  const [accessToken, setAccessToken, { removeItem: removeAccessToken }] =
    useSessionStorageState<string>(SSK_ACCESS_TOKEN)
  const [refreshToken, setRefreshToken, { removeItem: removeRefreshToken }] =
    useLocalStorageState<string>(LSK_REFRESH_TOKEN)

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
    refreshToken,
    setRefreshToken,
    removeRefreshToken,
  }
}
