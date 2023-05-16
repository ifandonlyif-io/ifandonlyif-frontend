import { useTranslation } from 'next-i18next'
import React from 'react'

import { Card } from '@/components/Card'
import { Label } from '@/components/Label'
import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

type StatusWithViewProperties = {
  title: string
  value: number
  labelClass: string
  valueClass: string
}

type StatusProperties = {
  title: string
  value: number
}

type StatusCardProperties = { title: string }

type OverviewStatusProperties = BaseComponent

function StatusWithView(properties: StatusWithViewProperties) {
  const { title, value, labelClass, valueClass } = properties
  const { t } = useTranslation('overview')
  const viewText = t(
    'overview.panelOverview.overviewStatus.statusWithView.viewLabel'
  )

  return (
    <div className="flex flex-col font-bold">
      <div className="flex flex-row items-center">
        <p className="mr-2 whitespace-nowrap text-base text-iff-text md:mr-6">
          {title}
        </p>
        <Label
          className={classNames('hidden md:flex', labelClass)}
          size="large"
        >
          {viewText}
        </Label>
        <Label className={classNames('md:hidden', labelClass)} size="medium">
          {viewText}
        </Label>
      </div>
      <p className={classNames('text-[48px] md:text-[64px]', valueClass)}>
        {String(value).padStart(2, '0')}
      </p>
    </div>
  )
}

function StatusInfo({ title, value }: StatusProperties) {
  return (
    <div className="flex flex-col font-bold text-iff-text">
      <p className="mr-6 whitespace-nowrap text-base">{title}</p>
      <p className="text-[32px]">{value}</p>
    </div>
  )
}

function StatusCard(properties: React.PropsWithChildren<StatusCardProperties>) {
  const { children, title } = properties
  return (
    <Card title={title}>
      <div className="flex flex-col p-4 md:gap-6 md:px-9 md:py-7">
        {children}
      </div>
    </Card>
  )
}

export function OverviewStatus({ className }: OverviewStatusProperties) {
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelOverview.overviewStatus',
  })

  return (
    <section
      className={classNames(
        'flex flex-col xl:grid xl:grid-cols-2 gap-6 md:gap-14 justify-between',
        className
      )}
    >
      {/* <StatusCard title={t('whitelist.statusCard.title')}>
        <div className="grid grid-cols-2 md:gap-12">
          <StatusWithView
            title={t('whitelist.statusWithView.title.expire')}
            value={1}
            labelClass="bg-[#FFC481]"
            valueClass="text-[#FF7E0C]"
          />
          <StatusWithView
            title={t('whitelist.statusWithView.title.preMint')}
            value={3}
            labelClass="bg-iff-cyan"
            valueClass="text-[#14D6D6]"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title={t('whitelist.statusInfo.title.all')} value={100} />
          <StatusInfo
            title={t('whitelist.statusInfo.title.alive')}
            value={10}
          />
          <StatusInfo
            title={t('whitelist.statusInfo.title.expired')}
            value={4}
          />
        </div>
      </StatusCard> */}
      <StatusCard title={t('iffNfts.statusCard.title')}>
        <div className="grid grid-cols-2">
          <StatusWithView
            title={t('iffNfts.statusWithView.title.recently')}
            value={5}
            labelClass="bg-[#D9CCFF]"
            valueClass="text-[#A585FF]"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title={t('iffNfts.statusInfo.title.all')} value={100} />
          <StatusInfo title={t('iffNfts.statusInfo.title.memoed')} value={5} />
          <StatusInfo title={t('iffNfts.statusInfo.title.fully')} value={1} />
        </div>
      </StatusCard>
    </section>
  )
}
