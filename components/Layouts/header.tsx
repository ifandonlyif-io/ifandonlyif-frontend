import Link from 'next/link'
import type React from 'react'

import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { IFFLogo } from '../Logo'
import { Navbar } from './navbar'

type HeaderProperties = BaseComponent

export function Header({ className }: HeaderProperties) {
  return (
    <header
      className={cn(
        'sticky z-10 flex flex-row items-center justify-between',
        'h-[88px] bg-black/20 px-[22px] shadow-iff-base backdrop-blur-2xl md:px-8',
        className,
      )}
    >
      <Link href="/" title="Home" aria-label="Home">
        <IFFLogo className="w-16 md:w-[106px]" />
      </Link>
      <Navbar />
    </header>
  )
}
