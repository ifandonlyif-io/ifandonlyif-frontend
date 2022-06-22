import { Card } from 'components/Card'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type OverviewGasProps = BaseComponent

export function OverviewGas({ className }: OverviewGasProps) {
  return (
    <section className={classNames('w-full', className)}>
      <Card title="GAS PRICE">
        <div className="flex flex-row py-6 px-4"></div>
      </Card>
    </section>
  )
}
