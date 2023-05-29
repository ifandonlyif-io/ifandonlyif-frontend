import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { FormProvider, useForm } from 'react-hook-form'
import { type Chain, createConfig, WagmiConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

import { isDevelopment } from '@/env'
import type { ReactProvider } from '@/types'
import {
  getAlchemyApiKey,
  getDefaultChainId,
  getInfuraApiKey,
  getWalletConnectProjectId,
} from '@/utils'

const infuraId = getInfuraApiKey()
const alchemyId = getAlchemyApiKey()
const walletConnectProjectId = getWalletConnectProjectId()

const initialChainId = Number(getDefaultChainId())
const availableChains: Chain[] = [mainnet, goerli].filter(
  (chain) => chain.id === initialChainId
)

const config = createConfig(
  getDefaultConfig({
    appName: 'If and only if',
    chains: availableChains.length > 0 ? availableChains : [mainnet],
    infuraId,
    alchemyId,
    walletConnectProjectId,
  })
)

export function AppProviders({ children }: ReactProvider) {
  const formMethods = useForm()

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme="midnight"
        options={{ initialChainId }}
        debugMode={isDevelopment}
      >
        <FormProvider {...formMethods}>{children}</FormProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
