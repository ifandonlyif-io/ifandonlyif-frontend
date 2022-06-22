import { Card } from 'components/Card'
import { EmailIcon, MoreVerticalIcon } from 'components/Icons'
import { Label } from 'components/Label'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type OverviewEmailProps = BaseComponent

type EmailInfoProps = {
  email: string
  default?: boolean
  notification?: boolean
}

function EmailInfo(props: EmailInfoProps) {
  const { email, notification } = props
  return (
    <div className="flex flex-row items-center">
      <EmailIcon htmlColor="#4F4F4F" />
      <div className="flex flex-row flex-1 gap-[10px] items-center ml-3">
        <p className="mr-3 text-base font-bold text-iff-text">{email}</p>
        {props.default && (
          <Label className="bg-[#BED0FF]" size="medium">
            Default
          </Label>
        )}
        {notification && (
          <Label className="bg-[#FFC481]" size="medium">
            Notification
          </Label>
        )}
      </div>
      <button className="mr-8" title="More">
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewEmail({ className }: OverviewEmailProps) {
  return (
    <section className={classNames('w-full', className)}>
      <Card title="EMAIL ADDRESS">
        <div className="flex flex-col gap-10 py-10 px-7">
          <EmailInfo email="collect_name_01@gmail.com" default notification />
          <EmailInfo email="collect_name_02@gmail.com" />
        </div>
      </Card>
    </section>
  )
}
