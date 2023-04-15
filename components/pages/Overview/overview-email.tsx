import { useTranslation } from 'next-i18next'
import React from 'react'

import { Card } from '@/components/Card'
import { EmailIcon, MoreVerticalIcon } from '@/components/Icons'
import { Label } from '@/components/Label'
import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

type OverviewEmailProperties = BaseComponent

type EmailInfoProperties = {
  email: string
  default?: boolean
  notification?: boolean
}

function EmailInfo(properties: EmailInfoProperties) {
  const { email, notification } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelOverview.overviewEmail.emailInfo.label',
  })

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-1 flex-col gap-[10px] md:flex-row">
        <div className="flex flex-row flex-nowrap items-center gap-[10px]">
          <EmailIcon htmlColor="#4F4F4F" />
          <p className="text-iff-text mr-3 text-base font-bold">{email}</p>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-[10px] self-end md:self-center">
          {properties.default && (
            <Label className="bg-[#BED0FF]" size="medium">
              {t('default')}
            </Label>
          )}
          {notification && (
            <Label className="bg-[#FFC481]" size="medium">
              {t('notification')}
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
  const { t } = useTranslation('overview')

  return (
    <section className={classNames('w-full', className)}>
      <Card title={t('overview.panelOverview.overviewEmail.card.title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:px-7 md:py-10">
          <EmailInfo email="collect_name_01@gmail.com" default notification />
          <EmailInfo email="collect_name_02@gmail.com" />
        </div>
      </Card>
    </section>
  )
}
