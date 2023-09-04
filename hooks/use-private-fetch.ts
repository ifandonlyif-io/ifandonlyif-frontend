import { type FetchContext, FetchError, ofetch } from 'ofetch'
import React from 'react'

import { getAPIBaseUrl } from '@/utils'

import { useRefreshToken } from './use-refresh-token'
import { useTokenStorage } from './use-token-storage'

const baseURL = getAPIBaseUrl('/')

export function usePrivateFetch() {
  const { accessToken } = useTokenStorage()
  const { refresh } = useRefreshToken()

  const onRequest = React.useCallback(
    (context: FetchContext<unknown>) => {
      if (!accessToken) return
      context.options.headers = Object.assign({}, context.options.headers, {
        Authorization: `bearer ${accessToken}`,
      })
    },
    [accessToken],
  )

  const privateFetch = React.useMemo(
    () => ofetch.create({ baseURL, onRequest }),
    [onRequest],
  )

  const fetchErrorHandler = React.useCallback(
    async (error: unknown) => {
      if (error instanceof FetchError && error.statusCode === 401) {
        console.debug('usePrivateFetch::fetchErrorHandler', error.statusCode)
        await refresh()
      }
    },
    [refresh],
  )

  return [privateFetch, fetchErrorHandler] as const
}
