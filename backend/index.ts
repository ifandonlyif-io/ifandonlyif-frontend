import { $fetch } from 'ohmyfetch'
import { FeedbackItem } from 'types'
import { GetDemoNFTListRes } from 'types/backend'
import { parseISODateTime } from 'utils'

function getAPIBaseUrl(path: string): string {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) throw new TypeError('NEXT_PUBLIC_API_URL not set')
  return new URL(path, baseUrl).href
}

const backendFetch = $fetch.create({ baseURL: getAPIBaseUrl('/') })

export async function getDemoNftList() {
  return await $fetch<GetDemoNFTListRes>(
    'http://localhost:3001/api/demo/nftlist'
  )
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
  return infoList.map((info) => [
    parseISODateTime(info.createdAt) * 1000,
    info.average / 10,
  ])
}

type GetSignatureCode = {
  code: string
}
export async function getSignatureCode(walletAddress: string) {
  return await backendFetch<GetSignatureCode>('/code', {
    method: 'POST',
    body: { walletAddress },
  })
}
