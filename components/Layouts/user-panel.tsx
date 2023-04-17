import { ConnectKitButton } from 'connectkit'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import { Avatar } from '@/components/Avatar'
import { Button, type ButtonProperties } from '@/components/Buttons'
import { EthereumIcon, MetamaskIcon } from '@/components/Icons'
import { useIffAccount } from '@/hooks'
import type { BaseComponent } from '@/types'
import { classNames, shortenAddress } from '@/utils'

type WalletInfoProperties = BaseComponent & {
  onClose: () => void
}

function WalletInfo(properties: WalletInfoProperties) {
  const { className, onClose } = properties
  const { t } = useTranslation('common')
  const { account, signOut } = useIffAccount()
  const accountString = account && shortenAddress(account.wallet)

  const handleDisconnectClick = React.useCallback(async () => {
    await signOut()
    onClose()
  }, [onClose, signOut])

  return (
    <div className={classNames('grid grid-cols-1 gap-3', className)}>
      <div className="flex flex-row flex-nowrap items-center">
        <EthereumIcon />
        <div className="ml-2 text-lg">{accountString}</div>
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

type WalletDropdownProperties = {
  isOpen: boolean
  onWalletDropdownClose: () => void
}

function WalletDropdown(properties: WalletDropdownProperties) {
  const { isOpen, onWalletDropdownClose } = properties

  // eslint-disable-next-line unicorn/no-null
  if (!isOpen) return null

  return (
    <div className="shadow-iff-modal absolute right-4 top-[90%] rounded-[10px] bg-white p-4">
      <WalletInfo onClose={onWalletDropdownClose} />
    </div>
  )
}

function ConnectWalletButton(properties: Omit<ButtonProperties, 'children'>) {
  const { t } = useTranslation('common')
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return (
          <Fragment>
            {isConnected ? (
              <Button
                outline
                className="gap-2 px-[8px]"
                shadow={false}
                size="small"
                {...properties}
              >
                Sign In
                {address && ` with ${shortenAddress(address)}`}
              </Button>
            ) : (
              <Button
                outline
                className="gap-2 px-[8px]"
                shadow={false}
                size="small"
                onClick={show}
              >
                {t('layouts.userPanel.connectWalletButton.connectButton')}
                <MetamaskIcon />
              </Button>
            )}
          </Fragment>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

type UserPanelProperties = BaseComponent

export function UserPanel({ className }: UserPanelProperties) {
  const { account, expired, signIn } = useIffAccount()

  const [isOpen, setIsOpen] = React.useState(false)

  const isLoggedIn = !expired
  const username = account?.username || 'Name'

  const handleWalletConnectClick = React.useCallback(async () => {
    await signIn()
  }, [signIn])

  const toggleWalletDropdown = React.useCallback(() => setIsOpen((s) => !s), [])
  const handleWalletDropdownClose = React.useCallback(
    () => setIsOpen(false),
    []
  )

  return (
    <div className={classNames('box-border', className)}>
      {!isLoggedIn && (
        <ConnectWalletButton onClick={handleWalletConnectClick} />
      )}
      {isLoggedIn && (
        <React.Fragment>
          <Avatar
            size="small"
            variant="text"
            src={username}
            onClick={toggleWalletDropdown}
          />
          <WalletDropdown
            isOpen={isOpen}
            onWalletDropdownClose={handleWalletDropdownClose}
          />
        </React.Fragment>
      )}
    </div>
  )
}
