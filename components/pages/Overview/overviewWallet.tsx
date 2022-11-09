import { Card } from 'components/Card'
import { EthereumIcon, MoreVerticalIcon } from 'components/Icons'
import { useAccountInfo } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type OverviewWalletProps = BaseComponent

type WalletInfoProps = { account: string }

function WalletInfo(props: WalletInfoProps) {
  const { account } = props
  const { t } = useTranslation('overview')

  return (
    <div className="flex flex-col text-base">
      <div className="mb-6 flex flex-row items-center">
        <div className="mr-4">
          <EthereumIcon />
        </div>
        <p className="flex-1 break-all font-bold text-iff-text">{account}</p>
        <button className="ml-4 md:ml-0 md:mr-8" title="More">
          <MoreVerticalIcon stroke="#4F4F4F" />
        </button>
      </div>
      <div className="flex flex-row items-center md:ml-11">
        <div className="mr-4 basis-0 font-bold text-[#F2994A] md:mr-20 md:basis-[initial]">
          {t('overview.panelOverview.overviewWallet.walletInfo.totalBalance')}
        </div>
        <div className="flex flex-row items-center">
          <EthereumIcon />
          <p className="ml-2 flex-1 font-medium text-iff-text">
            ETH 9,233 <br className="block md:hidden" />
            <span className="whitespace-nowrap">($USD 2,423,940,509)</span>
          </p>
          <button className="ml-4 font-bold text-[#F2994A]">
            {t('overview.panelOverview.overviewWallet.walletInfo.hideButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export function OverviewWallet({ className }: OverviewWalletProps) {
  const { t } = useTranslation('overview')
  const { account } = useAccountInfo()

  return (
    <section className={classNames('w-full', className)}>
      <Card title={t('overview.panelOverview.overviewWallet.card.title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:py-10 md:px-7">
          <WalletInfo account={account?.wallet || ''} />
        </div>
      </Card>
    </section>
  )
}
