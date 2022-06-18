import { IFFLogo } from 'components/Logo'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

import { UserPanel } from './userPanel'

type NavbarProps = BaseComponent

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={classNames(
        'flex flex-row justify-between items-center px-8 h-[88px] bg-black/20 shadow-iff-base backdrop-blur-2xl',
        className
      )}
    >
      <IFFLogo />
      <UserPanel />
    </nav>
  )
}
