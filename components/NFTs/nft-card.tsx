import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Avatar } from '@/components/Avatar'
import { CheckMarkIcon, CrossMarkIcon } from '@/components/Icons'
import type { BaseComponent } from '@/types'
import { classNames, formatDateTime } from '@/utils'

export type HolderRecord = {
  unixEpoch: number
  message: string
}

export type NFTCardProperties = BaseComponent & {
  name: string
  nftId: number
  nftType: string
  imageUri: string
  kycEpoch: number
  holderRecords?: HolderRecord[]
  flipBack?: boolean
  validity?: boolean
}

type HolderRecordProperties = BaseComponent & HolderRecord

function dateString(unixEpoch: number): string {
  return formatDateTime(unixEpoch, 'yyyy/L/dd')
}

function TextRow({
  className,
  children,
}: React.PropsWithChildren<BaseComponent>) {
  return (
    <div
      className={classNames(
        'flex flex-row justify-between items-center text-black',
        className
      )}
    >
      {children}
    </div>
  )
}

function Text({ className, children }: React.PropsWithChildren<BaseComponent>) {
  return <p className={classNames('p-0 m-0', className)}>{children}</p>
}

function NFTCardFront(properties: NFTCardProperties) {
  const { name, nftId, nftType, imageUri } = properties
  return (
    <div className="iff-nft-card__face iff-nft-card__face--front">
      <div className="flex flex-1 flex-col rounded-t-[10px] bg-[#F5F5F5] px-5">
        <TextRow className="pt-3 text-sm font-semibold uppercase">
          <Text>{name}</Text>
          <Text>#{nftId}</Text>
        </TextRow>
        <TextRow className="text-xs uppercase">
          <Text className="font-semibold">{nftType}</Text>
          <Text className="font-normal">{nftType}</Text>
        </TextRow>
        <TextRow className="text-xs uppercase">
          <Text className="font-semibold"></Text>
          <Text className="font-normal">{nftType}</Text>
        </TextRow>
      </div>
      <div className="flex flex-col items-center p-5">
        <Image
          className="h-[280px] w-[280px] rounded-[10px] object-cover"
          src={imageUri}
          alt="NFT Image"
          width={280}
          height={280}
          unoptimized
        />
      </div>
    </div>
  )
}

function NFTValidity(properties: Pick<NFTCardProperties, 'validity'>) {
  const { validity } = properties
  const { t } = useTranslation('common', {
    keyPrefix: 'nfts.nftCard.nftValidity',
  })
  const state = validity ? t('yes') : t('no')

  return (
    <div className="flex flex-row items-center">
      <Text className="mr-1 font-semibold">{state}</Text>
      {validity ? (
        <CheckMarkIcon htmlColor="#5A0DFF" fontSize={16} />
      ) : (
        <CrossMarkIcon htmlColor="#FF0000" fontSize={16} />
      )}
    </div>
  )
}

function HolderRecord(properties: HolderRecordProperties) {
  const { className, unixEpoch, message } = properties
  const date = dateString(unixEpoch)
  return (
    <div
      className={classNames(
        'group flex flex-row shrink-0 basis-10 relative w-full h-8 pl-5 pb-2 text-black text-xs !leading-4',
        'first-of-type:text-sm first-of-type:font-semibold',
        'after:box-content after:absolute after:top-[6px] after:left-[6px] after:bottom-0',
        'after:w-[1px] after:h-full after:bg-iff-cyan after:[content:"_"]',
        className
      )}
    >
      <Text
        className={classNames(
          'min-w-[80px]',
          'after:z-10 after:box-content after:[content:"_"] after:absolute after:top-[5px] after:left-[3px]',
          'after:w-[7px] after:h-[7px] after:bg-iff-cyan after:rounded-full',
          'group-first-of-type:after:top-1 group-first-of-type:after:left-[2px] group-first-of-type:after:w-[5px] group-first-of-type:after:h-[5px]',
          'group-first-of-type:after:border-[2px] group-first-of-type:after:border-solid group-first-of-type:after:border-[#2F80ED]'
        )}
      >
        {date}
      </Text>
      <Text className="text-line-2">{message}</Text>
    </div>
  )
}

function NFTCardBack(properties: NFTCardProperties) {
  const { name, nftId, nftType, imageUri, kycEpoch } = properties
  const { holderRecords = [], validity = false } = properties
  const date = dateString(kycEpoch)
  const { t } = useTranslation('common', { keyPrefix: 'nfts.nftCard.text' })

  return (
    <div className="iff-nft-card__face iff-nft-card__face--back">
      <TextRow
        className={classNames(
          'px-5 py-4 rounded-t-[10px]',
          validity ? '!bg-iff-cyan' : '!bg-[#FF7246]'
        )}
      >
        <Avatar size="medium" src={imageUri} />
        <div className="flex flex-col items-end justify-end text-right text-xs uppercase">
          <Text className="font-semibold">{name}</Text>
          <Text className="font-semibold">#{nftId}</Text>
          <Text className="font-normal">{nftType}</Text>
        </div>
      </TextRow>
      <div className="flex flex-1 flex-col px-5 py-4 text-black">
        <TextRow className="text-sm">
          <Text className="font-normal">{t('date')}</Text>
          <Text className="font-semibold">{date}</Text>
        </TextRow>
        <TextRow className="pt-[10px] text-sm">
          <Text className="font-normal">{t('validity')}</Text>
          <NFTValidity validity={validity} />
        </TextRow>
        <div className="bg-iff-cyan mt-4 h-[1px] w-full" />
        <Text className="mt-3 text-sm font-normal">{t('history')}</Text>
        <div className="ml-2 mt-3 flex h-[140px] min-h-0 flex-col overflow-y-scroll">
          {holderRecords.map((recoed, index) => (
            <HolderRecord
              unixEpoch={recoed.unixEpoch}
              message={recoed.message}
              key={`holder-record-${index}`}
            />
          ))}
        </div>
        <Text className="ml-[11px] mt-1 text-xs text-[#BDBDBD]">
          {t('recently')}
        </Text>
      </div>
    </div>
  )
}

export function NFTCard(properties: NFTCardProperties) {
  const { className, flipBack = false } = properties
  return (
    <div className={classNames('iff-nft-card-scene', className)}>
      <div
        className={classNames(
          'iff-nft-card',
          flipBack && '[transform:rotateY(180deg)]'
        )}
      >
        <NFTCardFront {...properties} />
        <NFTCardBack {...properties} />
      </div>
    </div>
  )
}