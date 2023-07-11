import '../styles/index.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

import { DefaultLayout as Layout } from '@/components/Layouts'
import { AppProviders } from '@/components/Providers'
import { I18nProvider } from '@/locales'
import type { NextPageWithLayout } from '@/types'

type AppPropertiesWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function NextApp({
  Component,
  pageProps,
}: AppPropertiesWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IF AND ONLY IF - ifandonlyif.io</title>
      </Head>
      <I18nProvider locale={pageProps.locale}>
        <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>
      </I18nProvider>
    </Fragment>
  )
}
