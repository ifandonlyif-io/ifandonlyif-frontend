import React from 'react'

import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { SocialLinks } from './social-links'

type FooterProperties = BaseComponent

export function Footer({ className }: FooterProperties) {
  const t = useScopedI18n('layouts.footer')

  return (
    <footer
      className={cn(
        'flex items-center justify-center gap-5 px-7 py-10',
        'bg-black/60 shadow-iff-base backdrop-blur-xl',
        className,
      )}
    >
      <p className="text-center text-sm font-medium leading-normal text-iff-grey-2">
        {t('follow')}
      </p>
      <SocialLinks />
    </footer>
  )
}
