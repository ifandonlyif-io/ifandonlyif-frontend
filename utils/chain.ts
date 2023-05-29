import { createPublicClient, http } from 'viem'
import { type Chain, mainnet, sepolia } from 'viem/chains'

import { getAlchemyApiKey, getDefaultChainId } from './environment'

const alchemyKey = getAlchemyApiKey()
const initialChainId = Number(getDefaultChainId())
const chain: Chain =
  [mainnet, sepolia].find((chain) => chain.id === initialChainId) ?? mainnet
const rpcUrl = chain.rpcUrls?.alchemy?.http[0]
  ? `${chain.rpcUrls?.alchemy?.http[0]}/${alchemyKey}`
  : undefined

export const publicClient = createPublicClient({
  chain,
  transport: http(rpcUrl),
})
