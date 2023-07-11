import React from 'react'

import { Card } from '@/components/Card'
import { EmailIcon, MoreVerticalIcon } from '@/components/Icons'
import { Label } from '@/components/Label'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type OverviewEmailProperties = BaseComponent

type EmailInfoProperties = {
  email: string
  default?: boolean
  notification?: boolean
}

function EmailInfo(properties: EmailInfoProperties) {
  const { email, notification } = properties
  const t = useScopedI18n('overview.overviewEmail')

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-1 flex-col gap-2.5 md:flex-row">
        <div className="flex flex-row flex-nowrap items-center gap-2.5">
          <EmailIcon htmlColor="#4F4F4F" />
          <p className="mr-3 text-base font-bold text-iff-text">{email}</p>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-2.5 self-end md:self-center">
          {properties.default && (
            <Label className="bg-[#BED0FF]" size="medium">
              {t('labelDefault')}
            </Label>
          )}
          {notification && (
            <Label className="bg-[#FFC481]" size="medium">
              {t('labelNotification')}
            </Label>
          )}
        </div>
      </div>
      <button
        className="ml-4 self-start md:ml-0 md:mr-8 md:self-center"
        title="More"
      >
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewEmail({ className }: OverviewEmailProperties) {
  const t = useScopedI18n('overview.overviewEmail')

  return (
    <section className={cn('w-full', className)}>
      <Card title={t('title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:px-7 md:py-10">
          <EmailInfo email="collect_name_01@gmail.com" default notification />
          <EmailInfo email="collect_name_02@gmail.com" />
        </div>
      </Card>
    </section>
  )
}
