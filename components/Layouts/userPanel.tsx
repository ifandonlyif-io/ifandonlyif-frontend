import { Button } from 'components/Buttons'
import { MetamaskIcon } from 'components/Icons'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type UserPanelProps = BaseComponent

export function UserPanel({ className }: UserPanelProps) {
  return (
    <div className={classNames('box-border', className)}>
      <Button outline className="gap-2 w-[172px]" shadow={false} size="small">
        Connect Metamask
        <MetamaskIcon />
      </Button>
    </div>
  )
}
