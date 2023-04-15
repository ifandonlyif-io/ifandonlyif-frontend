import { type FetchContext, type FetchResponse, ofetch } from 'ofetch'

import { LSK_ACCESS_TOKEN } from '@/constants'
import type {
  FeedbackItem,
  FetchUserNftsResponse,
  GetDemoNFTListResponse,
  MyNFTItem,
  NFTItem,
  NftProject,
} from '@/types'
import { convertOwnedNftsToMyNfts, parseISODateTime } from '@/utils'

function getAPIBaseUrl(path: string): string {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) throw new TypeError('NEXT_PUBLIC_API_URL not set')
  return new URL(path, baseUrl).href
}

const baseURL = getAPIBaseUrl('/')

function isLocalStorageAvailable(): boolean {
  if (typeof localStorage !== 'object') return false
  try {
    const test = 'test'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpiresAt: number
}

async function refreshToken(): Promise<boolean> {
  if (!isLocalStorageAvailable()) return false
  const token = localStorage.getItem(LSK_ACCESS_TOKEN)
  if (!token) return false
  try {
    const { accessToken } = await ofetch<RefreshTokenResponse>('/renewAccess', {
      baseURL,
      method: 'POST',
      body: { refreshToken: JSON.parse(token) },
    })
    if (!accessToken || typeof accessToken !== 'string') return false
    localStorage.setItem(LSK_ACCESS_TOKEN, JSON.stringify(accessToken))
    return true
  } catch {
    return false
  }
}

async function onBackendFetchRequest(context: FetchContext) {
  if (isLocalStorageAvailable()) {
    const token = localStorage.getItem(LSK_ACCESS_TOKEN)
    if (token) {
      context.options.headers = Object.assign({}, context.options.headers, {
        Authorization: `bearer ${JSON.parse(token)}`,
      })
    }
  }
}

async function onBackendFetchResponseError(
  context: FetchContext & {
    response: FetchResponse<unknown>
  }
) {
  if (context.response.status === 401 && isLocalStorageAvailable())
    localStorage.removeItem(LSK_ACCESS_TOKEN)
  // TODO: support refresh token
}

const backendFetch = ofetch.create({
  baseURL,
  onRequest: onBackendFetchRequest,
  onResponseError: onBackendFetchResponseError,
})

export async function getDemoNftList() {
  return await ofetch<GetDemoNFTListResponse>(
    'http://localhost:3001/api/demo/nft-list'
  )
}

export async function getDemoMyIffNft() {
  return await ofetch<NFTItem[]>(
    'http://localhost:3001/api/demo/fetch-my-iff-nft'
  )
}

export async function getDemoFeedbackList() {
  return await ofetch<FeedbackItem[]>(
    'http://localhost:3001/api/demo/feedback-list'
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
  const response = await backendFetch<string>(url, { method: 'POST' })
  const parsedResponse: FetchUserNftsResponse = JSON.parse(response)
  const myNfts = convertOwnedNftsToMyNfts(parsedResponse.ownedNfts)
  return myNfts
}

export async function checkSiteUri(url: string): Promise<boolean> {
  const response = await backendFetch<string>('/checkUri', {
    method: 'POST',
    body: { url },
  })
  return JSON.parse(response) as boolean
}

type GetNftProjects = NftProject[]

export async function getNftProjects(): Promise<GetNftProjects> {
  return await backendFetch<GetNftProjects>('/nftProjects')
}

export async function getEthToUsd(): Promise<string> {
  return await backendFetch<string>('/ethToUsd')
}
