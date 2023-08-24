import React from 'react'

import { navLinks } from '@/data'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { ExternalLink } from '../Link'
import { UserPanel } from './user-panel'

type NavLinkItemProperties = BaseComponent &
  Pick<React.ComponentProps<typeof ExternalLink>, 'to' | 'title'>

function NavLinkItem(properties: NavLinkItemProperties) {
  const { className, to, title } = properties
  return (
    <li className="flex">
      <ExternalLink
        className={`text-shadow-heading-1 ${cn(
          'w-full md:w-auto md:min-w-[100px]',
          'text-center text-sm font-bold text-white',
          className,
        )}`}
        blank
        to={to}
        title={title}
      >
        {title}
      </ExternalLink>
    </li>
  )
}

type NavLinksProperties = BaseComponent

function NavLinks({ className }: NavLinksProperties) {
  return (
    <ul className={cn('flex flex-col items-center md:flex-row', className)}>
      {navLinks.map((link) => (
        <NavLinkItem key={link.name} to={link.href} title={link.name} />
      ))}
    </ul>
  )
}

type NavbarProperties = BaseComponent

export function Navbar({ className }: NavbarProperties) {
  return (
    <nav
      className={cn(
        'flex flex-row items-center gap-3 md:flex-row-reverse md:gap-5',
        className,
      )}
    >
      <UserPanel />
      <NavLinks />
    </nav>
  )
}
