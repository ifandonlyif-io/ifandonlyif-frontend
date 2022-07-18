import { Button } from 'components/Buttons'
import { MetamaskIcon } from 'components/Icons'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type UserPanelProps = BaseComponent

export function UserPanel({ className }: UserPanelProps) {
  return (
    <div className={classNames('box-border', className)}>
      <Button outline className="w-[172px] gap-2" shadow={false} size="small">
        Connect Metamask
        <MetamaskIcon />
      </Button>
    </div>
  )
}
