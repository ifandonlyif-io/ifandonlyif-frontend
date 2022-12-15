import { LSK_ACCESS_TOKEN } from 'constants/'
import { FetchContext, FetchResponse, ofetch } from 'ofetch'
import { FeedbackItem, FetchUserNftsResponse, MyNFTItem, NFTItem } from 'types'
import { GetDemoNFTListRes, NftProject } from 'types/backend'
import { convertOwnedNftsToMyNfts, parseISODateTime } from 'utils'

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
  } catch (e) {
    return false
  }
}

type RefreshTokenRes = {
  accessToken: string
  accessTokenExpiresAt: number
}

async function refreshToken(): Promise<boolean> {
  if (!isLocalStorageAvailable()) return false
  const token = localStorage.getItem(LSK_ACCESS_TOKEN)
  if (!token) return false
  try {
    const { accessToken } = await ofetch<RefreshTokenRes>('/renewAccess', {
      baseURL,
      method: 'POST',
      body: { refreshToken: JSON.parse(token) },
    })
    if (!accessToken || typeof accessToken !== 'string') return false
    localStorage.setItem(LSK_ACCESS_TOKEN, JSON.stringify(accessToken))
    return true
  } catch (error) {
    return false
  }
}

async function onBackendFetchRequest(ctx: FetchContext) {
  if (isLocalStorageAvailable()) {
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
    if (isLocalStorageAvailable()) localStorage.removeItem(LSK_ACCESS_TOKEN)
    // TODO: support refresh token
  }
}

const backendFetch = ofetch.create({
  baseURL,
  onRequest: onBackendFetchRequest,
  onResponseError: onBackendFetchResponseError,
})

export async function getDemoNftList() {
  return await ofetch<GetDemoNFTListRes>(
    'http://localhost:3001/api/demo/nftlist'
  )
}

export async function getDemoMyIffNft() {
  return await ofetch<NFTItem[]>('http://localhost:3001/api/demo/fetchMyIffNft')
}

export async function getDemoFeedbackList() {
  return await ofetch<FeedbackItem[]>(
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

export async function checkSiteUri(url: string): Promise<boolean> {
  const res = await backendFetch<string>('/checkUri', {
    method: 'POST',
    body: { url },
  })
  return JSON.parse(res) as boolean
}

type GetNftProjects = NftProject[]

export async function getNftProjects(): Promise<GetNftProjects> {
  return await backendFetch<GetNftProjects>('/nftProjects')
}

export async function getEthToUsd(): Promise<string> {
  return await backendFetch<string>('/ethToUsd')
}
