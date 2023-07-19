import React from 'react'
import { useAccount, useBalance } from 'wagmi'

import { Card } from '@/components/Card'
import { EthereumIcon, MoreVerticalIcon } from '@/components/Icons'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

interface WalletInfoProperties {
  ethPrice?: string
}

function WalletInfo(properties: WalletInfoProperties) {
  const { ethPrice = '0' } = properties
  const t = useScopedI18n('overview.overviewWallet')
  const { address } = useAccount()
  const { data: balance } = useBalance({ address, watch: true })
  const [hidden, setHidden] = React.useState(false)

  const balanceString = Number.parseFloat(balance?.formatted ?? '0').toFixed(4)
  const ethUsdPrice =
    Number.parseFloat(ethPrice) * Number.parseFloat(balance?.formatted ?? '0')
  const ethUsdPriceString = ethUsdPrice.toFixed(2)

  const hiddenString = React.useCallback(
    (value: string) => (hidden ? '******' : value),
    [hidden],
  )
  const toggleHidden = React.useCallback(() => {
    setHidden((previous) => !previous)
  }, [])

  return (
    <div className="flex flex-col text-base">
      <div className="mb-6 flex flex-row items-center">
        <div className="mr-4">
          <EthereumIcon />
        </div>
        <p className="flex-1 break-all font-bold text-iff-text">{address}</p>
        <button
          className="ml-4 flex rounded-full p-3 hover:bg-gray-300 md:ml-0 md:mr-8"
          title="More"
        >
          <MoreVerticalIcon stroke="#4F4F4F" />
        </button>
      </div>
      <div className="flex flex-row items-center md:ml-11">
        <div className="mr-4 basis-0 font-bold text-[#F2994A] md:mr-20 md:basis-[initial]">
          {t('totalBalance')}
        </div>
        <div className="flex flex-row items-center">
          <EthereumIcon />
          <p className="ml-2 flex-1 font-medium text-iff-text">
            ETH {hiddenString(balanceString)} <br className="block md:hidden" />
            <span className="whitespace-nowrap">
              ($USD {hiddenString(ethUsdPriceString)})
            </span>
          </p>
          <button
            className="ml-4 rounded-md px-4 py-1 font-bold text-[#F2994A] hover:bg-gray-100"
            onClick={toggleHidden}
          >
            {hidden ? t('toggleShow') : t('toggleHide')}
          </button>
        </div>
      </div>
    </div>
  )
}

export type OverviewWalletProperties = BaseComponent &
  Required<WalletInfoProperties>

export function OverviewWallet(properties: OverviewWalletProperties) {
  const t = useScopedI18n('overview.overviewWallet')

  return (
    <section className={cn('w-full', properties.className)}>
      <Card title={t('title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:px-7 md:py-10">
          <WalletInfo {...properties} />
        </div>
      </Card>
    </section>
  )
}
