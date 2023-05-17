import { type FetchContext, type FetchResponse, ofetch } from 'ofetch'
import React from 'react'

import { getAPIBaseUrl } from '@/utils'

import { useRefreshToken } from './use-refresh-token'
import { useTokenStorage } from './use-token-storage'

const baseURL = getAPIBaseUrl('/')

export function usePrivateFetch() {
  const { refresh } = useRefreshToken()
  const { accessToken } = useTokenStorage()

  const onRequest = React.useCallback(
    async (context: FetchContext<unknown>) => {
      if (!accessToken) return
      context.options.headers = Object.assign({}, context.options.headers, {
        Authorization: `bearer ${accessToken}`,
      })
    },
    [accessToken]
  )

  const onResponse = React.useCallback(
    async (
      context: FetchContext<unknown> & {
        response: FetchResponse<unknown>
      }
    ) => {
      if (context.response.status === 401) {
        const token = await refresh()
        if (!token) return
        context.options.headers = Object.assign({}, context.options.headers, {
          Authorization: `bearer ${token}`,
        })
        const response = await ofetch.raw(context.request, context.options)
        context.error = undefined
        context.response = response
      }
    },
    [refresh]
  )

  const privateFetch = React.useMemo(
    () => ofetch.create({ baseURL, onRequest, onResponse }),
    [onRequest, onResponse]
  )

  return privateFetch
}
