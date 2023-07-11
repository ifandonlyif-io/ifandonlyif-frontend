import React from 'react'

import { Card } from '@/components/Card'
import { MoreVerticalIcon, TwitterIcon } from '@/components/Icons'
import { Label } from '@/components/Label'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type OverviewSocialProperties = BaseComponent

type SocialInfoProperties = {
  username: string
  verified?: boolean
}

function SocialInfo(properties: SocialInfoProperties) {
  const { username, verified } = properties
  const t = useScopedI18n('overview.overviewSocial')

  return (
    <div className="flex flex-row items-center">
      <TwitterIcon htmlColor="#4F4F4F" />
      <div className="ml-3 flex flex-1 flex-row items-center gap-2.5">
        <p className="mr-3 text-base font-bold text-iff-text">{username}</p>
        {verified && (
          <Label className="bg-[#FFC481]" size="medium">
            {t('labelVerified')}
          </Label>
        )}
      </div>
      <button
        className="ml-4 flex rounded-full p-3 hover:bg-gray-300 md:ml-0 md:mr-8"
        title="More"
      >
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewSocial({ className }: OverviewSocialProperties) {
  const t = useScopedI18n('overview.overviewSocial')

  return (
    <section className={cn('w-full', className)}>
      <Card title={t('title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:px-7 md:py-10">
          <SocialInfo username="collect_name_01" verified />
        </div>
      </Card>
    </section>
  )
}
