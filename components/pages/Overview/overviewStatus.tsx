import { Card } from 'components/Card'
import { Label } from 'components/Label'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type StatusWithViewProps = {
  title: string
  value: number
  labelClass: string
  valueClass: string
}

type StatusProps = {
  title: string
  value: number
}

type StatusCardProps = { title: string }

type OverviewStatusProps = BaseComponent

function StatusWithView(props: StatusWithViewProps) {
  const { title, value, labelClass, valueClass } = props
  return (
    <div className="flex flex-col font-bold">
      <div className="flex flex-row items-center">
        <p className="mr-6 whitespace-nowrap text-base text-iff-text">
          {title}
        </p>
        <Label className={labelClass} size="large">
          VIEW
        </Label>
      </div>
      <p className={classNames('text-[64px]', valueClass)}>
        {String(value).padStart(2, '0')}
      </p>
    </div>
  )
}

function StatusInfo({ title, value }: StatusProps) {
  return (
    <div className="flex flex-col font-bold text-iff-text">
      <p className="mr-6 whitespace-nowrap text-base">{title}</p>
      <p className="text-[32px]">{value}</p>
    </div>
  )
}

function StatusCard(props: React.PropsWithChildren<StatusCardProps>) {
  const { children, title } = props
  return (
    <Card title={title}>
      <div className="flex flex-col gap-6 py-7 px-9">{children}</div>
    </Card>
  )
}

export function OverviewStatus({ className }: OverviewStatusProps) {
  return (
    <section
      className={classNames(
        'flex flex-col xl:grid xl:grid-cols-2 gap-14 justify-between',
        className
      )}
    >
      <StatusCard title="WHITELIST STATUS">
        <div className="grid grid-cols-2 gap-12">
          <StatusWithView
            title="Expire Soon"
            value={1}
            labelClass="bg-[#FFC481]"
            valueClass="text-[#FF7E0C]"
          />
          <StatusWithView
            title="Pre-mint Soon"
            value={3}
            labelClass="bg-iff-cyan"
            valueClass="text-[#14D6D6]"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title="All" value={100} />
          <StatusInfo title="Alive" value={10} />
          <StatusInfo title="Expired" value={4} />
        </div>
      </StatusCard>
      <StatusCard title="IFFNFTs STATUS">
        <div className="grid grid-cols-2">
          <StatusWithView
            title="Recently Memoed"
            value={5}
            labelClass="bg-[#D9CCFF]"
            valueClass="text-[#A585FF]"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title="All" value={100} />
          <StatusInfo title="Memoed" value={5} />
          <StatusInfo title="Fully On chain" value={1} />
        </div>
      </StatusCard>
    </section>
  )
}
