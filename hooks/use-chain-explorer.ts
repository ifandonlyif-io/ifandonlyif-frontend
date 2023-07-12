import React from 'react'
import { useNetwork } from 'wagmi'

export function useChainExplorer(transactionHash?: `0x${string}`) {
  const { chain } = useNetwork()

  const explorerUrl = React.useMemo(() => {
    if (!transactionHash || !chain) return
    const { blockExplorers } = chain
    if (!blockExplorers) return
    const { url } = blockExplorers.default
    return `${url}/tx/${transactionHash}`
  }, [chain, transactionHash])

  return explorerUrl
}
