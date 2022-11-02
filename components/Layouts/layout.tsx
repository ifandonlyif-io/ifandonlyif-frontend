import { NeonUnderline } from 'components/Decorate'
import { useAccountInfo } from 'hooks'
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
  const { expired } = useAccountInfo()

  return (
    <Fragment>
      <Navbar />
      {expired && (
        <div className="flex h-[calc(100vh_-_88px)] w-full flex-row items-center justify-center bg-black/50 backdrop-blur-[18px]">
          <h4 className="heading-4 text-white">
            Please connect Metamask first
          </h4>
        </div>
      )}
      {!expired && (
        <main className="iff-layout">
          <h1 className="heading-4 text-shadow-heading-4 px-4 pt-11 text-center text-white">
            THE BEST WAY TO DO 2FA ON WEB3 ERA
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
