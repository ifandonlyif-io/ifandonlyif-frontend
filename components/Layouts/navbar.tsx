import Link from 'next/link'
import React from 'react'

import { IFFLogo } from '@/components/Logo'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { UserPanel } from './user-panel'

type NavbarProperties = BaseComponent

export function Navbar({ className }: NavbarProperties) {
  return (
    <nav
      className={cn(
        'sticky z-10 flex h-[88px] flex-row items-center justify-between bg-black/20 px-[22px] shadow-iff-base backdrop-blur-2xl md:px-8',
        className,
      )}
    >
      <Link href="/" title="Home" aria-label="Home">
        <IFFLogo className="w-16 md:w-[106px]" />
      </Link>
      <UserPanel />
    </nav>
  )
}
