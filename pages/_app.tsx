import '../styles/index.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

function NextApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IF AND ONLY IF - ifandonlyif.io</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default NextApp
