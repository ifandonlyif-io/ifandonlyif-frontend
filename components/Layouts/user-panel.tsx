import { Menu, Transition } from '@headlessui/react'
import { ConnectKitButton } from 'connectkit'
import React, { Fragment } from 'react'

import { Avatar } from '@/components/Avatar'
import { Button, type ButtonProperties } from '@/components/Buttons'
import { EthereumIcon, MetamaskIcon } from '@/components/Icons'
import { useAccess, useIffAccount } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn, shortenAddress } from '@/utils'

type WalletDropdownProperties = {
  username: string
}

function WalletDropdown(properties: WalletDropdownProperties) {
  const { username } = properties

  const t = useScopedI18n('layouts.userPanel')
  const { account, signOut } = useIffAccount()
  const accountString = account && shortenAddress(account.wallet)

  const handleDisconnectClick = React.useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <Menu>
      <Menu.Button>
        <Avatar size="small" variant="text" src={username} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="min-w-56 absolute right-4 mt-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-iff-modal">
          <div className="p-2">
            <Menu.Item>
              <div className="flex w-full items-center rounded-md p-1 text-lg">
                <EthereumIcon />
                <div className="ml-2">{accountString}</div>
              </div>
            </Menu.Item>
          </div>
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  id="disconnect-wallet"
                  className={cn(
                    'flex w-full items-center justify-center rounded-md p-1 text-lg',
                    active && 'bg-gray-300'
                  )}
                  onClick={handleDisconnectClick}
                >
                  {t('disconnectButton')}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function ConnectWalletButton(properties: Omit<ButtonProperties, 'children'>) {
  const t = useScopedI18n('layouts.userPanel')

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
                {t('connectButton')}
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
  const { noAccess } = useAccess()
  const { account, signIn } = useIffAccount()

  const username = React.useMemo(() => account?.username || 'Name', [account])

  const handleWalletConnectClick = React.useCallback(async () => {
    await signIn()
  }, [signIn])

  return (
    <div className={cn('box-border', className)}>
      {noAccess ? (
        <ConnectWalletButton onClick={handleWalletConnectClick} />
      ) : (
        <WalletDropdown username={username} />
      )}
    </div>
  )
}
