import Image from 'next/image'
import React from 'react'

import { Avatar } from '@/components/Avatar'
import { CheckMarkIcon, CrossMarkIcon } from '@/components/Icons'
import { useScopedI18n } from '@/locales'
import type { BaseComponent, NFTItem } from '@/types'
import { cn, formatDateTime } from '@/utils'

export interface HolderRecord {
  unixEpoch: number
  message: string
}

export interface NFTCardInfo extends NFTItem {
  kycEpoch: number
  holderRecords?: HolderRecord[]
  validity?: boolean
}

export interface NFTCardProperties extends BaseComponent, NFTCardInfo {
  flipBack?: boolean
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
      className={cn(
        'flex flex-row items-center justify-between text-black',
        className,
      )}
    >
      {children}
    </div>
  )
}

function Text({ className, children }: React.PropsWithChildren<BaseComponent>) {
  return <p className={cn('m-0 p-0', className)}>{children}</p>
}

function NFTCardFront(properties: NFTCardProperties) {
  const { name, tokenId, tokenType, imageUri } = properties
  return (
    <div className="iff-nft-card__face iff-nft-card__face--front">
      <div className="flex flex-1 flex-col rounded-t-xl bg-[#F5F5F5] px-5">
        <TextRow className="pt-3 text-sm font-semibold uppercase">
          <Text>{name}</Text>
          <Text>#{tokenId}</Text>
        </TextRow>
        <TextRow className="text-xs uppercase">
          <Text className="font-semibold">{tokenType}</Text>
          <Text className="font-normal">{tokenType}</Text>
        </TextRow>
        <TextRow className="text-xs uppercase">
          <Text className="font-semibold"></Text>
          <Text className="font-normal">{tokenType}</Text>
        </TextRow>
      </div>
      <div className="flex flex-col items-center p-5">
        <Image
          className="h-[280px] w-[280px] rounded-xl object-cover"
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
  const t = useScopedI18n('component.nftCard')
  const state = validity ? t('verified') : t('unverified')

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
      className={cn(
        'group relative flex h-8 w-full shrink-0 basis-10 flex-row pb-2 pl-5 text-xs !leading-4 text-black',
        'first-of-type:text-sm first-of-type:font-semibold',
        'after:absolute after:bottom-0 after:left-1.5 after:top-1.5 after:box-content',
        'after:h-full after:w-px after:bg-iff-cyan after:[content:"_"]',
        className,
      )}
    >
      <Text
        className={cn(
          'min-w-[80px]',
          'after:absolute after:left-[3px] after:top-[5px] after:z-10 after:box-content after:[content:"_"]',
          'after:h-[7px] after:w-[7px] after:rounded-full after:bg-iff-cyan',
          'group-first-of-type:after:left-0.5 group-first-of-type:after:top-1 group-first-of-type:after:h-[5px] group-first-of-type:after:w-[5px]',
          'group-first-of-type:after:border-2 group-first-of-type:after:border-solid group-first-of-type:after:border-[#2F80ED]',
        )}
      >
        {date}
      </Text>
      <Text className="text-line-2">{message}</Text>
    </div>
  )
}

function NFTCardBack(properties: NFTCardProperties) {
  const { name, tokenId, tokenType, imageUri, kycEpoch } = properties
  const { holderRecords = [], validity = false } = properties
  const date = dateString(kycEpoch)
  const t = useScopedI18n('component.nftCard')

  return (
    <div className="iff-nft-card__face iff-nft-card__face--back">
      <TextRow
        className={cn(
          'rounded-t-xl px-5 py-4',
          validity ? '!bg-iff-cyan' : '!bg-[#FF7246]',
        )}
      >
        <Avatar size="medium" src={imageUri} />
        <div className="flex flex-col items-end justify-end text-right text-xs uppercase">
          <Text className="font-semibold">{name}</Text>
          <Text className="font-semibold">#{tokenId}</Text>
          <Text className="font-normal">{tokenType}</Text>
        </div>
      </TextRow>
      <div className="flex flex-1 flex-col px-5 py-4 text-black">
        <TextRow className="text-sm">
          <Text className="font-normal">{t('date')}</Text>
          <Text className="font-semibold">{date}</Text>
        </TextRow>
        <TextRow className="pt-2.5 text-sm">
          <Text className="font-normal">{t('validity')}</Text>
          <NFTValidity validity={validity} />
        </TextRow>
        <div className="mt-4 h-px w-full bg-iff-cyan" />
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
    <div className={cn('iff-nft-card-scene', className)}>
      <div
        className={cn(
          'iff-nft-card',
          flipBack && '[transform:rotateY(180deg)]',
        )}
      >
        <NFTCardFront {...properties} />
        <NFTCardBack {...properties} />
      </div>
    </div>
  )
}
