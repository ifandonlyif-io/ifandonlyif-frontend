import { ReactProvider } from 'types'

import { Web3Provider } from './web3Provider'

export function AppProviders({ children }: ReactProvider) {
  return <Web3Provider>{children}</Web3Provider>
}
