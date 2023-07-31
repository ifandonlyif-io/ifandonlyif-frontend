import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { FormProvider, useForm } from 'react-hook-form'
import {
  type Chain,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
  WagmiConfig,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { isDevelopment } from '@/env'
import type { ReactProvider } from '@/types'
import {
  getAlchemyApiKey,
  getDefaultChainId,
  // getInfuraApiKey,
  getWalletConnectProjectId,
} from '@/utils'

const walletConnectProjectId = getWalletConnectProjectId()
const alchemyKey = getAlchemyApiKey()
// const infuraKey = getInfuraApiKey()

const initialChainId = Number(getDefaultChainId())
const availableChains: Chain[] = [mainnet, sepolia]
const chain: Chain =
  availableChains.find((chain) => chain.id === initialChainId) ??
  availableChains[0]

const { chains, publicClient } = configureChains(
  [chain],
  [
    alchemyProvider({ apiKey: alchemyKey }),
    // infuraProvider({ apiKey: infuraKey }),
    publicProvider(),
  ],
  { pollingInterval: 10_000 },
)

const config = createConfig(
  getDefaultConfig({
    appName: 'If and only if',
    chains,
    publicClient,
    walletConnectProjectId,
  }),
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
