import { NeonUnderline } from 'components/Decorate'
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
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export function OverviewLayout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Navbar />
      <main>
        <h1 className="pt-11 text-center text-white heading-4 text-shadow-heading-4">
          THE BEST WAY TO DO 2FA ON WEB3 ERA
        </h1>
        <div className="flex flex-row justify-center w-full">
          <NeonUnderline className="ml-[180px]" />
        </div>
        {children}
      </main>
    </Fragment>
  )
}
