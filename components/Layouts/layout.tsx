import { NeonUnderline } from 'components/Decorate'
import { useIffAccount } from 'hooks'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import { Footer } from './footer'
import { Navbar } from './navbar'

type LayoutProps = {
  children: React.ReactNode
}

export function DefaultLayout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Navbar />
      <main className="iff-layout">{children}</main>
      <Footer />
    </Fragment>
  )
}

export function OverviewLayout({ children }: LayoutProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'layouts.layout.overviewLayout',
  })
  const { expired, accountMismatch } = useIffAccount()
  const isLoggedIn = !expired && !accountMismatch

  return (
    <Fragment>
      <Navbar />
      {!isLoggedIn && (
        <div className="flex h-[calc(100vh_-_88px)] w-full flex-row items-center justify-center bg-black/50 backdrop-blur-[18px]">
          <h4 className="heading-4 text-white">{t('connect.tips')}</h4>
        </div>
      )}
      {isLoggedIn && (
        <main className="iff-layout">
          <h1 className="heading-4 text-shadow-heading-4 px-4 pt-11 text-center uppercase text-white">
            {t('main.heading')}
          </h1>
          <div className="hidden w-full flex-row justify-center md:flex">
            <NeonUnderline className="ml-[180px]" />
          </div>
          {children}
        </main>
      )}
    </Fragment>
  )
}
