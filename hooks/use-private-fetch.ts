import {
  type FetchContext,
  FetchError,
  type FetchOptions,
  type FetchRequest,
  type FetchResponse,
  ofetch,
} from 'ofetch'
import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { LSK_ACCESS_TOKEN } from '@/constants'
import { getAPIBaseUrl } from '@/utils'

import { useRefreshToken } from './use-refresh-token'

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

const baseURL = getAPIBaseUrl('/')

export function usePrivateFetch() {
  const refreshToken = useRefreshToken()
  const [accessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const onRequest = React.useCallback(
    async (context: FetchContext<unknown>) => {
      if (!accessToken) return
      context.options.headers = Object.assign({}, context.options.headers, {
        Authorization: `bearer ${accessToken}`,
      })
    },
    [accessToken]
  )

  const onResponseError = React.useCallback(
    async (
      context: FetchContext<unknown> & {
        response: FetchResponse<unknown>
      }
    ) => {
      if (context.response.status === 401) {
        await refreshToken()
      }
    },
    [refreshToken]
  )

  const privateFetch = React.useMemo(
    () => ofetch.create({ baseURL, onRequest, onResponseError }),
    [onRequest, onResponseError]
  )

  const fetch = React.useCallback(
    async <T = unknown, R extends ResponseType = 'json'>(
      request: FetchRequest,
      options?: FetchOptions<R>
    ) => {
      try {
        return await privateFetch<T, R>(request, options)
      } catch (error) {
        if (
          error instanceof FetchError &&
          (error.status === 401 || error.response?.status === 401) &&
          accessToken
        ) {
          return await privateFetch<T, R>(request, options)
        }
        throw error
      }
    },
    [accessToken, privateFetch]
  )

  return fetch
}
