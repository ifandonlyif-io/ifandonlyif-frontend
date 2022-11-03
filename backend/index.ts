import { LSK_ACCESS_TOKEN } from 'constants/'
import { $fetch, FetchContext, FetchResponse } from 'ohmyfetch'
import { FeedbackItem, FetchUserNftsResponse, MyNFTItem, NFTItem } from 'types'
import { GetDemoNFTListRes } from 'types/backend'
import { convertOwnedNftsToMyNfts, parseISODateTime } from 'utils'

function getAPIBaseUrl(path: string): string {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) throw new TypeError('NEXT_PUBLIC_API_URL not set')
  return new URL(path, baseUrl).href
}

async function onBackendFetchRequest(ctx: FetchContext) {
  if (
    typeof localStorage === 'object' &&
    'getItem' in localStorage &&
    typeof localStorage.getItem === 'function'
  ) {
    const token = localStorage.getItem(LSK_ACCESS_TOKEN)
    if (token) {
      ctx.options.headers = Object.assign({}, ctx.options.headers, {
        Authorization: `bearer ${JSON.parse(token)}`,
      })
    }
  }
}

async function onBackendFetchResponseError(
  ctx: FetchContext & {
    response: FetchResponse<unknown>
  }
) {
  if (ctx.response.status === 401) {
    if (
      typeof localStorage === 'object' &&
      'removeItem' in localStorage &&
      typeof localStorage.removeItem === 'function'
    )
      localStorage.removeItem(LSK_ACCESS_TOKEN)
    // TODO: support refresh token
  }
}

const backendFetch = $fetch.create({
  baseURL: getAPIBaseUrl('/'),
  onRequest: onBackendFetchRequest,
  onResponseError: onBackendFetchResponseError,
})

export async function getDemoNftList() {
  return await $fetch<GetDemoNFTListRes>(
    'http://localhost:3001/api/demo/nftlist'
  )
}

export async function getDemoMyIffNft() {
  return await $fetch<NFTItem[]>('http://localhost:3001/api/demo/fetchMyIffNft')
}

export async function getDemoFeedbackList() {
  return await $fetch<FeedbackItem[]>(
    'http://localhost:3001/api/demo/feedbacklist'
  )
}

type GasInfo = {
  average: number
  createdAt: string
}
type GasPrice = [number, number]
export async function getGasPriceData(): Promise<GasPrice[]> {
  const infoList = await backendFetch<GasInfo[]>('/gasInfo')
  const prices = infoList.map((info) => [
    parseISODateTime(info.createdAt) * 1000,
    info.average / 10,
  ])
  const sorted = prices.sort((a, b) => a[0] - b[0])
  return sorted as GasPrice[]
}

type GetSignatureCode = {
  code: string
}
export async function getSignatureCode(
  wallet: string
): Promise<GetSignatureCode> {
  return await backendFetch<GetSignatureCode>('/code', {
    method: 'POST',
    body: { wallet },
  })
}

type DoWalletLogin = {
  accessToken: string
}
export async function doWalletLogin(
  wallet: string,
  signature: string
): Promise<DoWalletLogin> {
  return await backendFetch<DoWalletLogin>('/login', {
    method: 'POST',
    body: { wallet, signature },
  })
}

export async function getUserNft(
  url = '/auth/fetchUserNft'
): Promise<MyNFTItem[]> {
  const res = await backendFetch<string>(url, { method: 'POST' })
  const parsedRes: FetchUserNftsResponse = JSON.parse(res)
  const myNfts = convertOwnedNftsToMyNfts(parsedRes.ownedNfts)
  return myNfts
}
