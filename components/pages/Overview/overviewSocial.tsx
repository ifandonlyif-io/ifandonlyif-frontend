import { Card } from 'components/Card'
import { MoreVerticalIcon, TwitterIcon } from 'components/Icons'
import { Label } from 'components/Label'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type OverviewSocialProps = BaseComponent

type SocialInfoProps = {
  username: string
  verified?: boolean
}

function SocialInfo(props: SocialInfoProps) {
  const { username, verified } = props
  const { t } = useTranslation('overview')

  return (
    <div className="flex flex-row items-center">
      <TwitterIcon htmlColor="#4F4F4F" />
      <div className="ml-3 flex flex-1 flex-row items-center gap-[10px]">
        <p className="mr-3 text-base font-bold text-iff-text">{username}</p>
        {verified && (
          <Label className="bg-[#FFC481]" size="medium">
            {t(
              'overview.panelOverview.overviewSocial.socialInfo.label.verified'
            )}
          </Label>
        )}
      </div>
      <button className="ml-4 md:ml-0 md:mr-8" title="More">
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewSocial({ className }: OverviewSocialProps) {
  const { t } = useTranslation('overview')

  return (
    <section className={classNames('w-full', className)}>
      <Card title={t('overview.panelOverview.overviewSocial.card.title')}>
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:py-10 md:px-7">
          <SocialInfo username="collect_name_01" verified />
        </div>
      </Card>
    </section>
  )
}
