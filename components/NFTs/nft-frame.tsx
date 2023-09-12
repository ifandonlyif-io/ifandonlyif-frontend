import Image from 'next/image'
import React from 'react'

import type { BaseComponent } from '@/types'
import { cn, formatDateTime } from '@/utils'

export interface NFTFrameProperties extends BaseComponent {
  name: string
  tokenId: number
  unixEpoch: number
  imageUri: string
  zone?: string
  hideTime?: boolean
}

export function NFTFrame(
  properties: React.PropsWithChildren<NFTFrameProperties>,
) {
  const { className, name, tokenId, imageUri } = properties
  const { unixEpoch, zone, hideTime = false } = properties
  const dateTimeString = React.useMemo<string>(
    () => formatDateTime(unixEpoch, "yyyy,L,dd ha 'UTC'Z", zone),
    [unixEpoch, zone],
  )

  return (
    <div className={cn('flex w-full flex-col md:w-[150px]', className)}>
      <div
        className={cn(
          'group relative mb-1.5 flex w-full flex-col md:w-[150px]',
        )}
      >
        <Image
          className="aspect-square h-full w-full object-cover object-center"
          src={imageUri}
          alt="NFT Image"
          width={250}
          height={250}
          unoptimized
        />
        {!hideTime && (
          <p
            className={cn(
              'absolute bottom-0 flex flex-row items-center justify-center',
              'w-full bg-black/50 py-1.5 text-white group-hover:text-[#FAFF00]',
              'text-xs font-bold',
              // isExpired && 'group-hover:text-white',
            )}
          >
            {dateTimeString}
          </p>
        )}
      </div>
      <h5 className={cn('text-xs font-bold text-black')}>
        {name}#{tokenId}
      </h5>
    </div>
  )
}
