import injectedModule from '@web3-onboard/injected-wallets'
import { init, Web3OnboardProvider } from '@web3-onboard/react'
import { FormProvider, useForm } from 'react-hook-form'
import { ReactProvider } from 'types'

function getInfuraApiKey(): string {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY
  if (!apiKey) throw new TypeError('NEXT_PUBLIC_INFURA_API_KEY not set')
  return apiKey
}

const infuraApiKey = getInfuraApiKey()

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${infuraApiKey}`,
  },
]
const wallets = [injectedModule()]
const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: 'If and only if',
    icon: '<svg viewBox="0 0 64 64" fill="none"><path fill="#000" d="M0 0h64v64H0z"/><path d="M13.807 19.406V45h-3.392V19.406h3.393zm9.563 0V45h-3.392V19.406h3.392zM34.092 30.92v2.777H22.631V30.92h11.461zm1.74-11.514v2.777H22.631v-2.777h13.201zm7.436 0V45h-3.393V19.406h3.393zM53.99 30.92v2.777H42.529V30.92H53.99zm1.74-11.514v2.777H42.529v-2.777h13.201z" fill="#46ffe6"/></svg>',
    description: 'If and only if',
  },
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
})

export function AppProviders({ children }: ReactProvider) {
  const formMethods = useForm()

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <FormProvider {...formMethods}>{children}</FormProvider>
    </Web3OnboardProvider>
  )
}
