export function getInfuraApiKey(): string {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY
  if (!apiKey) throw new TypeError('NEXT_PUBLIC_INFURA_API_KEY not set')
  return apiKey
}

export function getAlchemyApiKey(): string {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  if (!apiKey) throw new TypeError('NEXT_PUBLIC_ALCHEMY_API_KEY not set')
  return apiKey
}

export function getDefaultChainId(): string {
  const chainId: string | undefined = process.env.NEXT_PUBLIC_CHAIN_ID
  if (!chainId) throw new TypeError('NEXT_PUBLIC_CHAIN_ID not set')
  return chainId
}

export function getIffNftContractAddress(): string {
  const address: string | undefined =
    process.env.NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS
  if (!address)
    throw new TypeError('NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS not set')
  return address
}
