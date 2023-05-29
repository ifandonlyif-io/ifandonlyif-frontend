import { getAddress } from 'viem'

import { environment } from '@/env/client'

export function getAPIBaseUrl(path: string): string {
  const baseUrl = environment.NEXT_PUBLIC_API_URL
  return new URL(path, baseUrl).href
}

export function getInfuraApiKey(): string | undefined {
  const apiKey = environment.NEXT_PUBLIC_INFURA_API_KEY
  return apiKey
}

export function getAlchemyApiKey(): string {
  const apiKey = environment.NEXT_PUBLIC_ALCHEMY_API_KEY
  return apiKey
}

export function getWalletConnectProjectId(): string {
  const projectId = environment.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  return projectId
}

export function getDefaultChainId(): string {
  const chainId = environment.NEXT_PUBLIC_CHAIN_ID
  return chainId
}

export function getIffNftContractAddress(): `0x${string}` {
  const address = environment.NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS
  return getAddress(address)
}
