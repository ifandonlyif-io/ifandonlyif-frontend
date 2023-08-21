import React from 'react'

import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type DisclaimerProperties = BaseComponent

export function Disclaimer({ className }: DisclaimerProperties) {
  const t = useScopedI18n('layouts.disclaimer')

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'bg-[#442112]/30 shadow-iff-base backdrop-blur-3xl',
        'px-8 py-10 lg:py-20',
        className,
      )}
    >
      <div className="lg:max-w-[972px] xl:max-w-[1254px]">
        <p
          className={cn(
            'heading-4 text-shadow-heading-2 text-center text-[#DAFFFF]',
            'md:heading-2 mb-3 md:mb-0',
          )}
        >
          {t('heading')}
        </p>
        <p className="text-center text-[18px] font-bold leading-normal text-white md:text-[22px]">
          {t('content')}
        </p>
      </div>
    </div>
  )
}
