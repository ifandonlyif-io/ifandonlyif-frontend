import { ethers } from 'ethers'

import { getAlchemyApiKey, getDefaultChainId, getInfuraApiKey } from './env'

const defaultChainId = getDefaultChainId()
const infuraKey = getInfuraApiKey()
const alchemyKey = getAlchemyApiKey()
const network = ethers.providers.getNetwork(Number(defaultChainId))

export const readonlyProvider = ethers.getDefaultProvider(network, {
  infura: infuraKey,
  alchemy: alchemyKey,
})
