import { ofetch } from 'ofetch'

import type { IffNftMeta, NftProject } from '@/types'
import { getAPIBaseUrl, parseISODateTime } from '@/utils'

const baseURL = getAPIBaseUrl('/')

const publicFetch = ofetch.create({ baseURL })

interface GetSignatureCode {
  code: string
}
export async function getSignatureCode(
  wallet: string,
): Promise<GetSignatureCode> {
  return await publicFetch<GetSignatureCode>('/code', {
    method: 'POST',
    body: { wallet },
  })
}

interface DoWalletLogin {
  accessToken: string
  refreshToken: string
}
export async function doWalletLogin(
  wallet: string,
  signature: string,
): Promise<DoWalletLogin> {
  return await publicFetch<DoWalletLogin>('/login', {
    method: 'POST',
    body: { wallet, signature },
  })
}

interface RefreshTokenResponse {
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
    },
  )
  return accessToken
}

interface GasInfo {
  average: string
  createdAt: string
}
type GasPrice = [number, number]
export async function getGasPriceData(): Promise<GasPrice[]> {
  const infoList = await publicFetch<GasInfo[]>('/gasInfo')
  const prices = infoList.map((info) => [
    parseISODateTime(info.createdAt) * 1000,
    Number.parseFloat(info.average),
  ])
  const sorted = prices.sort((a, b) => a[0] - b[0])
  return sorted as GasPrice[]
}

export async function checkSiteUriExists(
  uri: string,
): Promise<boolean | string> {
  const response = await publicFetch<boolean | string>(
    '/checkExistBlocklists',
    {
      method: 'POST',
      body: { uri },
    },
  )
  return response
}

export async function checkBlocklistInfo(uuid: string): Promise<boolean> {
  const response = await publicFetch<boolean>('/checkBlocklists', {
    method: 'POST',
    body: { uuid },
  })
  console.log('checkBlocklistInfo', response, typeof response)
  return response
}

type GetNftProjects = NftProject[]
export async function getNftProjects(): Promise<GetNftProjects> {
  return await publicFetch<GetNftProjects>('/nftProjects')
}

export async function getEthToUsd(): Promise<string> {
  return await publicFetch<string>('/ethToUsd')
}

export async function getIffNftMeta(): Promise<IffNftMeta> {
  const data = await publicFetch<string>('/getIffNftMeta')
  return JSON.parse(data) as IffNftMeta
}

export async function checkSpamContract(address: string): Promise<boolean> {
  const data = await publicFetch<boolean>('/checkSpamContract', {
    method: 'POST',
    body: { address },
  })
  return data
}
