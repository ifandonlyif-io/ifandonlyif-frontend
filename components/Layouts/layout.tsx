import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import { NeonUnderline } from '@/components/Decorate'
import { useIffAccount } from '@/hooks'

import { Footer } from './footer'
import { Navbar } from './navbar'

type LayoutProperties = {
  children: React.ReactNode
}

export function DefaultLayout({ children }: LayoutProperties) {
  return (
    <Fragment>
      <Navbar />
      <main className="iff-layout">{children}</main>
      <Footer />
    </Fragment>
  )
}

export function OverviewLayout({ children }: LayoutProperties) {
  const { t } = useTranslation('common', {
    keyPrefix: 'layouts.layout.overviewLayout',
  })
  const { account, address, expired, signOut } = useIffAccount()
  const isLoggedIn = !expired

  React.useEffect(() => {
    if (!expired && account && address && account.wallet !== address) {
      signOut().then()
    }
  }, [account, address, expired, signOut])

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
