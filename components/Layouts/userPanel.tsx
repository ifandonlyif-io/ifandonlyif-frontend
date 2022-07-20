import type { Web3Provider } from '@ethersproject/providers'
import { useWeb3React, Web3ContextType } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Button, ButtonProps } from 'components/Buttons'
import { MetamaskIcon, WalletConnectIcon } from 'components/Icons'
import {
  ConnectionType,
  injectedConnection,
  walletConnectConnection,
} from 'connections'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, getConnectionName, isMetaMask } from 'utils'

type ConnectionOptionProps = BaseComponent & {
  id: string
  icon: React.ReactNode
  active: boolean
  children: React.ReactNode
  onOptionClick: () => void
}

function ConnectionOption(props: ConnectionOptionProps) {
  const { className, id, icon, children, onOptionClick } = props
  return (
    <button
      id={id}
      className={classNames(
        'px-4 py-2 rounded-[10px] hover:bg-gray-300',
        className
      )}
      onClick={onOptionClick}
    >
      <div className="flex flex-row flex-nowrap items-center">
        <div className="flex flex-row flex-nowrap items-center text-3xl">
          {icon}
        </div>
        <div className="ml-3 text-xl">{children}</div>
      </div>
    </button>
  )
}

type ConnectorOptionProps = {
  tryActivation: (connector: Connector) => void
}

function MetaMaskOption(props: ConnectorOptionProps) {
  const { tryActivation } = props
  const isActive = injectedConnection.hooks.useIsActive()
  const optionName = getConnectionName(ConnectionType.INJECTED, isMetaMask())
  const handleOptionClick = React.useCallback(
    () => tryActivation(injectedConnection.connector),
    [tryActivation]
  )
  return (
    <ConnectionOption
      id="wallet-connect"
      icon={<MetamaskIcon />}
      active={isActive}
      onOptionClick={handleOptionClick}
    >
      {optionName}
    </ConnectionOption>
  )
}

function WalletConnectOption(props: ConnectorOptionProps) {
  const { tryActivation } = props
  const isActive = walletConnectConnection.hooks.useIsActive()
  const optionName = getConnectionName(ConnectionType.WALLET_CONNECT)
  const handleOptionClick = React.useCallback(
    () => tryActivation(walletConnectConnection.connector),
    [tryActivation]
  )
  return (
    <ConnectionOption
      id="wallet-connect"
      icon={<WalletConnectIcon />}
      active={isActive}
      onOptionClick={handleOptionClick}
    >
      {optionName}
    </ConnectionOption>
  )
}

type WalletConnectionsProps = BaseComponent

function WalletConnections(props: WalletConnectionsProps) {
  const { className } = props
  const handleTryActivation = React.useCallback(
    async (connector: Connector) => {
      try {
        await connector.activate()
      } catch (error) {
        console.error('Activate connector error:', error)
      }
    },
    []
  )
  return (
    <div className={classNames('grid grid-cols-1 gap-3', className)}>
      <MetaMaskOption tryActivation={handleTryActivation} />
      <WalletConnectOption tryActivation={handleTryActivation} />
    </div>
  )
}

type WalletDropdownProps = Pick<Web3ContextType<Web3Provider>, 'account'> & {
  isOpen: boolean
}

function WalletDropdown(props: WalletDropdownProps) {
  const { account, isOpen } = props
  if (!isOpen) return null
  return (
    <div className="absolute top-[90%] right-4 rounded-[10px] bg-white p-4 shadow-iff-modal">
      {!account && <WalletConnections />}
    </div>
  )
}

function ConnectWalletButton(props: Omit<ButtonProps, 'children'>) {
  return (
    <Button
      outline
      className="w-[172px] gap-2"
      shadow={false}
      size="small"
      {...props}
    >
      Connect Metamask
      <MetamaskIcon />
    </Button>
  )
}

type UserPanelProps = BaseComponent

export function UserPanel({ className }: UserPanelProps) {
  const { account } = useWeb3React()
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleWalletDropdown = React.useCallback(() => setIsOpen((s) => !s), [])

  return (
    <div className={classNames('box-border', className)}>
      <ConnectWalletButton onClick={toggleWalletDropdown} />
      <WalletDropdown account={account} isOpen={isOpen} />
    </div>
  )
}
