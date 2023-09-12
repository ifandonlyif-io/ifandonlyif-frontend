import type { NextPage } from 'next'
import type React from 'react'

export declare type BaseComponent<T = unknown> = Pick<
  React.HTMLAttributes<T>,
  'className'
>

export declare interface ReactProvider {
  children: React.ReactNode
}

export declare interface PerPageLayout {
  getLayout(page: React.ReactElement): React.ReactNode
}

export declare type NextPageWithLayout<
  P = Record<string, unknown>,
  IP = P,
> = NextPage<P, IP> & PerPageLayout

export declare type RemoveIndex<Q> = {
  [key in keyof Q as string extends key
    ? never
    : key extends string
    ? key
    : never]: Q[key]
}
