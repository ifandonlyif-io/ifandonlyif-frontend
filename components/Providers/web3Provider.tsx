import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Connection, ConnectionType } from 'connections'
import React from 'react'
import { ReactProvider } from 'types'
import { getConnection, getConnectionName } from 'utils'

export function Web3Provider({ children }: ReactProvider) {
  const connections = [
    ConnectionType.INJECTED,
    ConnectionType.WALLET_CONNECT,
  ].map(getConnection)
  const connectors: [Connector, Web3ReactHooks][] = connections.map(
    ({ hooks, connector }) => [connector, hooks]
  )
  const key = React.useMemo(
    () =>
      connections
        .map(({ type }: Connection) => getConnectionName(type))
        .join('-'),
    [connections]
  )

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  )
}
