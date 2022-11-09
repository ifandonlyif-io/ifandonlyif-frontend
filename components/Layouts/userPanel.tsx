import { useWeb3React } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Avatar } from 'components/Avatar'
import { Button, ButtonProps } from 'components/Buttons'
import { EthereumIcon, MetamaskIcon, WalletConnectIcon } from 'components/Icons'
import {
  ConnectionType,
  injectedConnection,
  walletConnectConnection,
} from 'connections'
import { useAccountInfo, useMetamaskAccount } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, getConnectionName, isMetaMask, shortAccount } from 'utils'

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
  tryActivation: (connector: Connector) => Promise<void>
}

function MetaMaskOption(props: ConnectorOptionProps) {
  const { tryActivation } = props
  const isActive = injectedConnection.hooks.useIsActive()
  const optionName = getConnectionName(ConnectionType.INJECTED, isMetaMask())
  const handleOptionClick = React.useCallback(
    async () => await tryActivation(injectedConnection.connector),
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
    async () => await tryActivation(walletConnectConnection.connector),
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

type WalletConnectionsProps = BaseComponent & {
  onWalletDropdownClose: () => void
}

function WalletConnections(props: WalletConnectionsProps) {
  const { className, onWalletDropdownClose } = props
  const { account } = useWeb3React()
  const { expired } = useAccountInfo()
  const { walletLogin } = useMetamaskAccount()

  const handleTryActivation = React.useCallback(
    async (connector: Connector) => {
      try {
        await connector.activate()
        onWalletDropdownClose()
      } catch (error) {
        console.error('Activate connector error:', error)
      }
    },
    [onWalletDropdownClose]
  )

  React.useEffect(() => {
    if (account && expired) walletLogin()
  }, [account, expired, walletLogin])

  return (
    <div className={classNames('grid grid-cols-1 gap-3', className)}>
      <MetaMaskOption tryActivation={handleTryActivation} />
      <WalletConnectOption tryActivation={handleTryActivation} />
    </div>
  )
}

type WalletInfoProps = BaseComponent & {
  account: string
}

function WalletInfo(props: WalletInfoProps) {
  const { account, className } = props
  const accStr = shortAccount(account)
  const { t } = useTranslation('common')
  const { connector } = useWeb3React()
  const { walletLogin } = useMetamaskAccount()

  const handleLogin = React.useCallback(async () => {
    await walletLogin()
  }, [walletLogin])
  const handleDisconnectClick = React.useCallback(() => {
    if (connector.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }, [connector])

  return (
    <div className={classNames('grid grid-cols-1 gap-3', className)}>
      <div
        className="flex flex-row flex-nowrap items-center"
        onClick={handleLogin}
      >
        <EthereumIcon />
        <div className="ml-2 text-lg">{accStr}</div>
      </div>
      <button
        id="disconnect-wallet"
        className="rounded-[10px] px-4 py-2 text-xl hover:bg-gray-300"
        onClick={handleDisconnectClick}
      >
        {t('layouts.userPanel.walletInfo.disconnectButton')}
      </button>
    </div>
  )
}

type WalletDropdownProps = {
  isOpen: boolean
  onWalletDropdownClose: () => void
}

function WalletDropdown(props: WalletDropdownProps) {
  const { isOpen, onWalletDropdownClose } = props
  const { account: accountInfo, expired } = useAccountInfo()

  if (!isOpen) return null

  return (
    <div className="absolute top-[90%] right-4 rounded-[10px] bg-white p-4 shadow-iff-modal">
      {expired && (
        <WalletConnections onWalletDropdownClose={onWalletDropdownClose} />
      )}
      {!expired && accountInfo && <WalletInfo account={accountInfo.wallet} />}
    </div>
  )
}

function ConnectWalletButton(props: Omit<ButtonProps, 'children'>) {
  const { t } = useTranslation('common')
  return (
    <Button
      outline
      className="gap-2 px-[8px]"
      shadow={false}
      size="small"
      {...props}
    >
      {t('layouts.userPanel.connectWalletButton.connectButton')}
      <MetamaskIcon />
    </Button>
  )
}

type UserPanelProps = BaseComponent

export function UserPanel({ className }: UserPanelProps) {
  const { account: accountInfo, expired } = useAccountInfo()

  const [isOpen, setIsOpen] = React.useState(false)

  const username = accountInfo?.username || 'Name'

  const toggleWalletDropdown = React.useCallback(() => setIsOpen((s) => !s), [])
  const handleWalletDropdownClose = React.useCallback(
    () => setIsOpen(false),
    []
  )

  return (
    <div className={classNames('box-border', className)}>
      {expired && <ConnectWalletButton onClick={toggleWalletDropdown} />}
      {!expired && (
        <Avatar
          size="small"
          variant="text"
          src={username}
          onClick={toggleWalletDropdown}
        />
      )}
      <WalletDropdown
        isOpen={isOpen}
        onWalletDropdownClose={handleWalletDropdownClose}
      />
    </div>
  )
}
