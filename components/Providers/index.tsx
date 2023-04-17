import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { FormProvider, useForm } from 'react-hook-form'
import { createClient, WagmiConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

import { isDevelopment } from '@/env'
import type { ReactProvider } from '@/types'
import { getAlchemyApiKey, getDefaultChainId, getInfuraApiKey } from '@/utils'

const infuraId = getInfuraApiKey()
const alchemyId = getAlchemyApiKey()

const client = createClient(
  getDefaultClient({
    appName: 'If and only if',
    chains: [mainnet, goerli],
    infuraId,
    alchemyId,
  })
)

const initialChainId = Number(getDefaultChainId())

export function AppProviders({ children }: ReactProvider) {
  const formMethods = useForm()

  return (
    <WagmiConfig client={client}>
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
