import React from 'react'

import { Card } from '@/components/Card'
import { Label } from '@/components/Label'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

interface StatusWithViewProperties {
  title: string
  value: number
  labelClass: string
  valueClass: string
}

interface StatusProperties {
  title: string
  value: number
}

interface StatusCardProperties {
  title: string
}

type OverviewStatusProperties = BaseComponent

function StatusWithView(properties: StatusWithViewProperties) {
  const { title, value, labelClass, valueClass } = properties
  const t = useScopedI18n('overview.overviewStatus')
  const viewText = t('viewLabel')

  return (
    <div className="flex flex-col font-bold">
      <div className="flex flex-row items-center">
        <p className="mr-2 whitespace-nowrap text-base text-iff-text md:mr-6">
          {title}
        </p>
        <Label className={cn('hidden md:flex', labelClass)} size="large">
          {viewText}
        </Label>
        <Label className={cn('md:hidden', labelClass)} size="medium">
          {viewText}
        </Label>
      </div>
      <p className={cn('text-[48px] md:text-[64px]', valueClass)}>
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
  const t = useScopedI18n('overview.overviewStatus')

  return (
    <section
      className={cn(
        'flex flex-col justify-between gap-6 md:gap-14 xl:grid xl:grid-cols-2',
        className,
      )}
    >
      {/* <StatusCard title={t('whitelist.title')}>
        <div className="grid grid-cols-2 md:gap-12">
          <StatusWithView
            title={t('whitelist.expire')}
            value={1}
            labelClass="bg-[#FFC481]"
            valueClass="text-[#FF7E0C]"
          />
          <StatusWithView
            title={t('whitelist.preMint')}
            value={3}
            labelClass="bg-iff-cyan"
            valueClass="text-[#14D6D6]"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title={t('whitelist.all')} value={100} />
          <StatusInfo title={t('whitelist.alive')} value={10} />
          <StatusInfo title={t('whitelist.expired')} value={4} />
        </div>
      </StatusCard> */}
      <StatusCard title={t('iffNfts.title')}>
        <div className="grid grid-cols-2">
          <StatusWithView
            title={t('iffNfts.recently')}
            value={5}
            labelClass="bg-[#D9CCFF]"
            valueClass="text-iff-neon-purple"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <StatusInfo title={t('iffNfts.all')} value={100} />
          <StatusInfo title={t('iffNfts.memoed')} value={5} />
          <StatusInfo title={t('iffNfts.fully')} value={1} />
        </div>
      </StatusCard>
    </section>
  )
}
