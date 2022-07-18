import { Card } from 'components/Card'
import { MoreVerticalIcon, TwitterIcon } from 'components/Icons'
import { Label } from 'components/Label'
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
  return (
    <div className="flex flex-row items-center">
      <TwitterIcon htmlColor="#4F4F4F" />
      <div className="ml-3 flex flex-1 flex-row items-center gap-[10px]">
        <p className="mr-3 text-base font-bold text-iff-text">{username}</p>
        {verified && (
          <Label className="bg-[#FFC481]" size="medium">
            Verified
          </Label>
        )}
      </div>
      <button className="mr-8" title="More">
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewSocial({ className }: OverviewSocialProps) {
  return (
    <section className={classNames('w-full', className)}>
      <Card title="SOCIAL CONNECT">
        <div className="flex flex-col gap-10 py-10 px-7">
          <SocialInfo username="collect_name_01" verified />
        </div>
      </Card>
    </section>
  )
}
