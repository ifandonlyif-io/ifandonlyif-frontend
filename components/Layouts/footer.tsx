import { useTranslation } from 'next-i18next'
import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

type FooterProperties = BaseComponent

export function Footer({ className }: FooterProperties) {
  const { t } = useTranslation('common', {
    keyPrefix: 'layouts.footer.paragraph',
  })

  return (
    <footer
      className={classNames(
        'flex flex-col items-center justify-center',
        'bg-[#442112]/30 shadow-iff-base backdrop-blur-[69px]',
        'py-10 lg:py-20 px-8',
        className
      )}
    >
      <div className="lg:max-w-[972px] xl:max-w-[1254px]">
        <p
          className={classNames(
            'text-center text-[#DAFFFF] heading-4 text-shadow-heading-2',
            'mb-3 md:mb-0 md:heading-2'
          )}
        >
          {t('heading')}
        </p>
        <p className="text-center text-[18px] font-bold leading-normal text-white md:text-[22px]">
          {t('content')}
        </p>
      </div>
    </footer>
  )
}
