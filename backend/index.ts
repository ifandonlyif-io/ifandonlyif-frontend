import { ofetch } from 'ofetch'

import type {
  FeedbackItem,
  GetDemoNFTListResponse,
  NFTItem,
  NftProject,
} from '@/types'
import { getAPIBaseUrl, parseISODateTime } from '@/utils'

const baseURL = getAPIBaseUrl('/')

const publicFetch = ofetch.create({ baseURL })

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

export async function getFeedbackList() {
  return await ofetch<FeedbackItem[]>('http://localhost:3001/api/feedback-list')
}

type GetSignatureCode = {
  code: string
}
export async function getSignatureCode(
  wallet: string
): Promise<GetSignatureCode> {
  return await publicFetch<GetSignatureCode>('/code', {
    method: 'POST',
    body: { wallet },
  })
}

type DoWalletLogin = {
  accessToken: string
  refreshToken: string
}
export async function doWalletLogin(
  wallet: string,
  signature: string
): Promise<DoWalletLogin> {
  return await publicFetch<DoWalletLogin>('/login', {
    method: 'POST',
    body: { wallet, signature },
  })
}

type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpiresAt: number
}
export async function refreshToken(token: string): Promise<string | undefined> {
  if (!token) return
  const { accessToken } = await publicFetch<RefreshTokenResponse>(
    '/renewAccess',
    {
      baseURL,
      method: 'POST',
      body: { refreshToken: token },
    }
  )
  return accessToken
}

type GasInfo = {
  average: number
  createdAt: string
}
type GasPrice = [number, number]
export async function getGasPriceData(): Promise<GasPrice[]> {
  const infoList = await publicFetch<GasInfo[]>('/gasInfo')
  const prices = infoList.map((info) => [
    parseISODateTime(info.createdAt) * 1000,
    info.average / 10,
  ])
  const sorted = prices.sort((a, b) => a[0] - b[0])
  return sorted as GasPrice[]
}

export async function checkSiteUri(url: string): Promise<boolean> {
  const response = await publicFetch<string>('/checkUri', {
    method: 'POST',
    body: { url },
  })
  return JSON.parse(response) as boolean
}

type GetNftProjects = NftProject[]
export async function getNftProjects(): Promise<GetNftProjects> {
  return await publicFetch<GetNftProjects>('/nftProjects')
}

export async function getEthToUsd(): Promise<string> {
  return await publicFetch<string>('/ethToUsd')
}
