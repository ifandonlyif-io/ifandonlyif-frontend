import Image from 'next/image'
import React from 'react'

import { NFTButton } from '@/components/Buttons'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn, formatDateTime, isHistorical } from '@/utils'

type NFTFrameProperties = BaseComponent & {
  name: string
  tokenId: number
  unixEpoch: number
  imageUri: string
  zone?: string
  expired?: boolean
  hideTime?: boolean
  onHideClick?: () => void
}

export function NFTFrame(
  properties: React.PropsWithChildren<NFTFrameProperties>,
) {
  const { expired } = properties
  const { children, className, onHideClick } = properties
  const { name, tokenId, imageUri } = properties
  const { unixEpoch, zone, hideTime = false } = properties

  const t = useScopedI18n('component.nftFrame')
  const isExpired = React.useMemo<boolean>(() => {
    if (hideTime) return false
    if (expired === undefined) return isHistorical(unixEpoch)
    return expired
  }, [expired, hideTime, unixEpoch])
  const dateTimeString = React.useMemo<string>(
    () => formatDateTime(unixEpoch, "yyyy,L,dd ha 'UTC'Z", zone),
    [unixEpoch, zone],
  )

  return (
    <div className={cn('flex w-full flex-col md:w-[150px]', className)}>
      <div
        className={cn(
          'group relative mb-1.5 flex w-full flex-col md:w-[150px]',
          isExpired && 'opacity-50',
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
              isExpired && 'group-hover:text-white',
            )}
          >
            {dateTimeString}
          </p>
        )}
        {isExpired && (
          <div
            className={cn(
              'absolute bottom-[38px] flex flex-row items-center justify-center self-center',
              'h-4 w-11 rounded-[36px] bg-black',
              'text-center text-[8px] font-bold text-white',
            )}
          >
            {t('expired')}
          </div>
        )}
      </div>
      <h5
        className={cn(
          'text-xs font-bold text-black',
          isExpired && 'opacity-50',
        )}
      >
        {name}#{tokenId}
      </h5>
      {(isExpired || children) && (
        <div className="mt-5">
          {isExpired ? (
            <NFTButton
              outline
              className="border-iff-orange text-iff-orange"
              onClick={onHideClick}
            >
              {t('hide')}
            </NFTButton>
          ) : (
            <div className="flex flex-row items-center justify-between">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
