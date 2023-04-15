import '../styles/index.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Fragment } from 'react'

import { DefaultLayout as Layout } from '@/components/Layouts'
import { AppProviders } from '@/components/Providers'
import type { NextPageWithLayout } from '@/types'

// @ts-expect-error - next-i18next not yet supporting ESM
import nextI18NextConfig from '../next-i18next.config.cjs'

type AppPropertiesWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function NextApp({ Component, pageProps }: AppPropertiesWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IF AND ONLY IF - ifandonlyif.io</title>
      </Head>
      <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>
    </Fragment>
  )
}

export default appWithTranslation(NextApp, nextI18NextConfig)
