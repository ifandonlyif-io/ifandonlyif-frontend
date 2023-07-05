import useLocalStorageState from 'use-local-storage-state'

import { LSK_ACCESS_TOKEN, LSK_REFRESH_TOKEN } from '@/constants'

export function useTokenStorage() {
  const [accessToken, setAccessToken, { removeItem: removeAccessToken }] =
    useLocalStorageState<string>(LSK_ACCESS_TOKEN)
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
