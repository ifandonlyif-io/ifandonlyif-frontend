import { IFFLogo } from 'components/Logo'
import Link from 'next/link'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

import { UserPanel } from './userPanel'

type NavbarProps = BaseComponent

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={classNames(
        'sticky flex flex-row justify-between items-center px-[22px] md:px-8 h-[88px] bg-black/20 shadow-iff-base backdrop-blur-2xl z-10',
        className
      )}
    >
      <Link href="/" title="Home" aria-label="Home">
        <IFFLogo className="w-16 md:w-[106px]" />
      </Link>
      <UserPanel />
    </nav>
  )
}
