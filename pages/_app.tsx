import '../styles/index.css'

import { DefaultLayout as Layout } from 'components/Layouts'
import { AppProviders } from 'components/Providers'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { NextPageWithLayout } from 'types'

import nextI18NextConfig from '../next-i18next.config.js'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function NextApp({ Component, pageProps }: AppPropsWithLayout) {
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

// @ts-expect-error Custom Next layout
export default appWithTranslation(NextApp, nextI18NextConfig)
