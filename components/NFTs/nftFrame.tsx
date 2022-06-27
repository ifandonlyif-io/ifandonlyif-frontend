/* eslint-disable @next/next/no-img-element */
import { NFTButton } from 'components/Buttons'
import { DateTime } from 'luxon'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type NFTFrameProps = BaseComponent & {
  name: string
  unixEpoch: number
  imageUri: string
  expired?: boolean
  hideTime?: boolean
  onHideClick?: () => void
}

export function NFTFrame(props: React.PropsWithChildren<NFTFrameProps>) {
  let { expired } = props
  const { children, className, onHideClick } = props
  const { name, imageUri, unixEpoch, hideTime = false } = props
  const dateTime = DateTime.fromSeconds(unixEpoch)
  const dateTimeStr = dateTime.toFormat("yyyy,L,dd ha 'UTC'Z")
  const nowEpoch = DateTime.now().toSeconds()
  if (typeof expired === 'undefined') {
    expired = nowEpoch > dateTime.toSeconds()
    if (hideTime) expired = false
  }

  return (
    <div className={classNames('flex flex-col group w-[150px]', className)}>
      <div
        className={classNames(
          'flex flex-col relative mb-[6px] w-[150px] h-[150px]',
          expired && 'opacity-50'
        )}
      >
        <img
          className="object-cover w-full h-full"
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
            Expired
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
              className="!text-[#FF906D] !border-[#FFC8A0]"
              onClick={onHideClick}
            >
              Hide
            </NFTButton>
          ) : (
            <div className="flex flex-row justify-between items-center">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
