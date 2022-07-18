import { Card } from 'components/Card'
import { EthereumIcon, MoreVerticalIcon } from 'components/Icons'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type OverviewWalletProps = BaseComponent

type WalletInfoProps = { account: string }

function WalletInfo(props: WalletInfoProps) {
  const { account } = props
  return (
    <div className="flex flex-col text-base">
      <div className="mb-6 flex flex-row items-center">
        <div className="mr-4">
          <EthereumIcon />
        </div>
        <p className="flex-1 font-bold text-iff-text">{account}</p>
        <button className="mr-8" title="More">
          <MoreVerticalIcon stroke="#4F4F4F" />
        </button>
      </div>
      <div className="ml-11 flex flex-row items-center">
        <div className="mr-20 font-bold text-[#F2994A]">Total Balance</div>
        <div className="flex flex-row items-center">
          <EthereumIcon />
          <p className="ml-2 flex-1 font-medium text-iff-text">
            ETH 9,233 ($USD 2,423,940,509)
          </p>
          <button className="ml-4 font-bold text-[#F2994A]">Hide</button>
        </div>
      </div>
    </div>
  )
}

export function OverviewWallet({ className }: OverviewWalletProps) {
  return (
    <section className={classNames('w-full', className)}>
      <Card title="MY WALLETs">
        <div className="flex flex-col gap-10 py-10 px-7">
          <WalletInfo account="0xreowrko43pjt34pojgerlfldgfergergerreowrko43pjt34pojgerger" />
        </div>
      </Card>
    </section>
  )
}
