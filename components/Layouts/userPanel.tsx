import { Avatar } from 'components/Avatar'
import { Button, ButtonProps } from 'components/Buttons'
import { EthereumIcon, MetamaskIcon } from 'components/Icons'
import { useAccountInfo, useIffAccount, useWeb3Account } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, shortAccount } from 'utils'

type WalletInfoProps = BaseComponent & {
  account: string
}

function WalletInfo(props: WalletInfoProps) {
  const { account, className } = props
  const accStr = shortAccount(account)
  const { t } = useTranslation('common')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { disconnect } = useWeb3Account()

  const handleDisconnectClick = React.useCallback(async () => {
    await disconnect()
  }, [disconnect])

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
  const { isOpen } = props
  const { account: accountInfo } = useAccountInfo()

  if (!isOpen) return null

  return (
    <div className="absolute top-[90%] right-4 rounded-[10px] bg-white p-4 shadow-iff-modal">
      {accountInfo && <WalletInfo account={accountInfo.wallet} />}
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
  const { walletLogin } = useIffAccount()

  const [isOpen, setIsOpen] = React.useState(false)

  const username = accountInfo?.username || 'Name'

  const handleWalletConnectClick = React.useCallback(async () => {
    await walletLogin()
  }, [walletLogin])

  const toggleWalletDropdown = React.useCallback(() => setIsOpen((s) => !s), [])
  const handleWalletDropdownClose = React.useCallback(
    () => setIsOpen(false),
    []
  )

  return (
    <div className={classNames('box-border', className)}>
      {expired && <ConnectWalletButton onClick={handleWalletConnectClick} />}
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
