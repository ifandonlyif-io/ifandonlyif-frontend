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
      <div className="flex flex-1 flex-col gap-[10px] md:flex-row">
        <div className="flex flex-row flex-nowrap items-center gap-[10px]">
          <EmailIcon htmlColor="#4F4F4F" />
          <p className="mr-3 text-base font-bold text-iff-text">{email}</p>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-[10px] self-end md:self-center">
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
      </div>
      <button
        className="ml-4 self-start md:mr-8 md:ml-0 md:self-center"
        title="More"
      >
        <MoreVerticalIcon stroke="#4F4F4F" />
      </button>
    </div>
  )
}

export function OverviewEmail({ className }: OverviewEmailProps) {
  return (
    <section className={classNames('w-full', className)}>
      <Card title="EMAIL ADDRESS">
        <div className="flex flex-col gap-4 p-4 md:gap-10 md:py-10 md:px-7">
          <EmailInfo email="collect_name_01@gmail.com" default notification />
          <EmailInfo email="collect_name_02@gmail.com" />
        </div>
      </Card>
    </section>
  )
}
