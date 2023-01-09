/* eslint-disable @next/next/no-img-element */
import { NFTButton } from 'components/Buttons'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, formatDatetime, isHistorical } from 'utils'

type NFTFrameProps = BaseComponent & {
  name: string
  unixEpoch: number
  imageUri: string
  zone?: string
  expired?: boolean
  hideTime?: boolean
  onHideClick?: () => void
}

export function NFTFrame(props: React.PropsWithChildren<NFTFrameProps>) {
  let { expired } = props
  const { children, className, onHideClick } = props
  const { t } = useTranslation('common', { keyPrefix: 'nfts.nftFrame' })
  const { name, imageUri, unixEpoch, zone, hideTime = false } = props
  const dateTimeStr = formatDatetime(unixEpoch, "yyyy,L,dd ha 'UTC'Z", zone)
  if (typeof expired === 'undefined') {
    expired = isHistorical(unixEpoch)
    if (hideTime) expired = false
  }

  return (
    <div
      className={classNames(
        'flex flex-col group w-full md:w-[150px]',
        className
      )}
    >
      <div
        className={classNames(
          'flex flex-col relative mb-[6px] w-full md:w-[150px]',
          expired && 'opacity-50'
        )}
      >
        <img
          className="aspect-square h-full w-full object-cover object-center"
          src={imageUri}
          alt="NFT Image"
        />
        {!hideTime && (
          <p
            className={classNames(
              'flex absolute bottom-0 flex-row justify-center items-center',
              'w-full py-[6px] text-white group-hover:text-[#FAFF00] bg-black/50',
              'text-xs font-bold',
              expired && 'group-hover:text-white'
            )}
          >
            {dateTimeStr}
          </p>
        )}
        {expired && (
          <div
            className={classNames(
              'flex flex-row justify-center items-center self-center absolute bottom-[38px]',
              'w-11 h-4 rounded-[36px] bg-black',
              'text-[8px] text-white font-bold text-center'
            )}
          >
            {t('expired')}
          </div>
        )}
      </div>
      <h5
        className={classNames(
          'text-xs font-bold text-black',
          expired && 'opacity-50'
        )}
      >
        {name}
      </h5>
      {(expired || children) && (
        <div className="mt-5">
          {expired ? (
            <NFTButton
              outline
              className="!border-[#FFC8A0] !text-[#FF906D]"
              onClick={onHideClick}
            >
              {t('nftButton.hide')}
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
