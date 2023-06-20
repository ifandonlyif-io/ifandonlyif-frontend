import type { StaticImageData } from 'next/image'

export * from './account'
export * from './backend'
export * from './nft'
export * from './utils'

export declare type FeedbackItem = {
  avatar: StaticImageData | string
  username?: string
  content: string
}
