import { environment } from '@/env'

export function getInfuraApiKey(): string {
  const apiKey = environment.client.NEXT_PUBLIC_INFURA_API_KEY
  return apiKey
}

export function getAlchemyApiKey(): string {
  const apiKey = environment.client.NEXT_PUBLIC_ALCHEMY_API_KEY
  return apiKey
}

export function getDefaultChainId(): string {
  const chainId = environment.client.NEXT_PUBLIC_CHAIN_ID
  return chainId
}

export function getIffNftContractAddress(): string {
  const address = environment.client.NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS
  return address
}
