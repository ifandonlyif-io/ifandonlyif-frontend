import React, { Fragment } from 'react'

import { NeonUnderline } from '@/components/Decorate'
import { useAccess } from '@/hooks'
import { useScopedI18n } from '@/locales'

import { Disclaimer } from './disclaimer'
import { Footer } from './footer'
import { Navbar } from './navbar'

interface LayoutProperties {
  children: React.ReactNode
}

export function DefaultLayout({ children }: LayoutProperties) {
  return (
    <Fragment>
      <Navbar />
      <main className="iff-layout">{children}</main>
      <Disclaimer />
      <Footer />
    </Fragment>
  )
}

export function OverviewLayout({ children }: LayoutProperties) {
  const t = useScopedI18n('layouts.overview')
  const { noAccess } = useAccess()

  return (
    <Fragment>
      <Navbar />
      {noAccess ? (
        <div className="flex h-[calc(100vh_-_88px)] w-full flex-row items-center justify-center bg-black/50 backdrop-blur-[18px]">
          <h4 className="heading-4 text-white">{t('login')}</h4>
        </div>
      ) : (
        <main className="iff-layout">
          <h1 className="heading-4 text-shadow-heading-4 px-4 pt-11 text-center uppercase text-white">
            {t('heading')}
          </h1>
          <div className="hidden w-full flex-row justify-center md:flex">
            <NeonUnderline className="ml-[180px]" />
          </div>
          {children}
        </main>
      )}
      <Footer />
    </Fragment>
  )
}
