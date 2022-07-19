import { Connector } from '@web3-react/types'
import {
  Connection,
  ConnectionType,
  injectedConnection,
  walletConnectConnection,
} from 'connections'

export function isInjected(): boolean {
  return Boolean(window?.ethereum)
}

export function isMetaMask(): boolean {
  return window?.ethereum?.isMetaMask ?? false
}

export function getConnectionName(
  connectionType: ConnectionType,
  isMetaMask?: boolean
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? 'MetaMask' : 'Injected'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
  }
}

function getConnectionByType(conn: ConnectionType): Connection {
  switch (conn) {
    case ConnectionType.INJECTED:
      return injectedConnection
    case ConnectionType.WALLET_CONNECT:
      return walletConnectConnection
    default:
      throw Error('Unsupported connector')
  }
}

const CONNECTIONS: Connection[] = [injectedConnection, walletConnectConnection]
export function getConnection(conn: Connector | ConnectionType): Connection {
  if (conn instanceof Connector) {
    const connection = CONNECTIONS.find(
      (connection) => connection.connector === conn
    )
    if (!connection) throw Error('Unsupported connector')
    return connection
  } else {
    return getConnectionByType(conn)
  }
}
