import type { StaticImageData } from 'next/image'

export * from './account'
export * from './backend'
export * from './nft'
export * from './utils'

export declare interface FeedbackItem {
  avatar: StaticImageData | string
  username?: string
  content: string
}

export declare type DeepString<T> = {
  [P in keyof T]: T[P] extends object ? DeepString<T[P]> : string
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {}
