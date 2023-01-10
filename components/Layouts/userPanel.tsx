import { Avatar } from 'components/Avatar'
import { Button, ButtonProps } from 'components/Buttons'
import { EthereumIcon, MetamaskIcon } from 'components/Icons'
import { useIffAccount } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, shortAccount } from 'utils'

type WalletInfoProps = BaseComponent & {
  onClose: () => void
}

function WalletInfo(props: WalletInfoProps) {
  const { className, onClose } = props
  const { t } = useTranslation('common')
  const { account, signOut } = useIffAccount()
  const accStr = account && shortAccount(account.wallet)

  const handleDisconnectClick = React.useCallback(async () => {
    await signOut()
    onClose()
  }, [onClose, signOut])

  return (
    <div className={classNames('grid grid-cols-1 gap-3', className)}>
      <div className="flex flex-row flex-nowrap items-center">
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

  if (!isOpen) return null

  return (
    <div className="absolute top-[90%] right-4 rounded-[10px] bg-white p-4 shadow-iff-modal">
      <WalletInfo onClose={onWalletDropdownClose} />
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
  const { account, accountMismatch, chainMismatch, expired, signIn } =
    useIffAccount()

  const [isOpen, setIsOpen] = React.useState(false)

  const isLoggedIn = !expired && !accountMismatch && !chainMismatch
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
