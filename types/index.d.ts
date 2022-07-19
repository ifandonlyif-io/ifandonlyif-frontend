import type { NextPage } from 'next'
import type React from 'react'

export declare type BaseComponent<T = unknown> = Pick<
  React.HTMLAttributes<T>,
  'className'
>

export declare type ReactProvider = { children: React.ReactNode }

export declare type PerPageLayout = {
  getLayout(page: React.ReactElement): React.ReactNode
}

export declare type NextPageWithLayout<
  P = Record<string, unknown>,
  IP = P
> = NextPage<P, IP> & PerPageLayout

export declare type NFTItem = {
  name: string
  unixEpoch: number
  imageUri: string
}
