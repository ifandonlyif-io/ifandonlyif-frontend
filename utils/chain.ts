import { ethers } from 'ethers'

import { getDefaultChainId, getInfuraApiKey } from './env'

const defaultChainId = getDefaultChainId()
const infuraKey = getInfuraApiKey()
const network = ethers.providers.getNetwork(defaultChainId)

export const readonlyProvider = ethers.getDefaultProvider(network, {
  infura: infuraKey,
})
