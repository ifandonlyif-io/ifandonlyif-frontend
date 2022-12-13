import { Card } from 'components/Card'
import { EthereumIcon, MoreVerticalIcon } from 'components/Icons'
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils'
import { useWeb3Account } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type WalletInfoProps = {
  ethPrice?: string
}

function WalletInfo(props: WalletInfoProps) {
  const { ethPrice = '0' } = props
  const { t } = useTranslation('overview')
  const { account, balance } = useWeb3Account()

  const balanceStr = parseFloat(formatEther(balance)).toFixed(4)
  const _ethPrice = parseUnits(ethPrice, 4)
  const ethUsdPrice = balance.mul(_ethPrice)
  const ethUsdPriceStr = parseFloat(formatUnits(ethUsdPrice, 22)).toFixed(2)

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
            ETH {balanceStr} <br className="block md:hidden" />
            <span className="whitespace-nowrap">($USD {ethUsdPriceStr})</span>
          </p>
          <button className="ml-4 font-bold text-[#F2994A]">
            {t('overview.panelOverview.overviewWallet.walletInfo.hideButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export type OverviewWalletProps = BaseComponent & Required<WalletInfoProps>

export function OverviewWallet(props: OverviewWalletProps) {
  const { t } = useTranslation('overview')

  return (
    <section className={classNames('w-full', props.className)}>
      <Card title={t('overview.panelOverview.overviewWallet.card.title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:py-10 md:px-7">
          <WalletInfo {...props} />
        </div>
      </Card>
    </section>
  )
}
