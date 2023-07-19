import { useRouter } from 'next/router'
import React from 'react'

import { Button } from '@/components/Buttons'
import { IFFCube } from '@/components/Logo'
import { useScopedI18n } from '@/locales'

export function SectionHeader() {
  const t = useScopedI18n('home.sectionHeader')
  const router = useRouter()

  const handleJoinButtonClick = React.useCallback(() => {
    void router.push('/overview')
  }, [router])

  return (
    <section className="mx-auto mb-7 flex flex-col md:mb-[70px] md:flex-row md:flex-nowrap md:justify-center">
      <div className="mr-[112px] hidden w-[324px] md:block">
        <IFFCube className="!mt-0 scale-125" />
      </div>
      <div className="flex max-w-[298px] flex-col md:max-w-[684px]">
        <h1 className="heading-4 md:heading-1 text-shadow-heading-1 mb-4 uppercase text-white md:mb-6">
          {t('heading')}
        </h1>
        <h2 className="subtitle-2 md:heading-5 text-shadow-subtitle-2 md:text-shadow-heading-5 mb-8 uppercase text-[#D9FFFA]">
          {t('subheading')}
        </h2>
        <Button
          className="mx-auto max-w-[174px] uppercase md:max-w-[280px]"
          primary
          size="large"
          onClick={handleJoinButtonClick}
        >
          {t('joinButton')}
        </Button>
      </div>
    </section>
  )
}
