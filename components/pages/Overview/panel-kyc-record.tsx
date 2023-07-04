import { useTranslation } from 'next-i18next'

import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { TabTitle } from './title'

type RecordDataProperties = { name: string }

function TextRow(properties: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = properties
  return (
    <div
      className={cn(
        'flex flex-row items-center text-base text-black',
        className
      )}
    >
      {children}
    </div>
  )
}

function Text({ className, children }: React.PropsWithChildren<BaseComponent>) {
  return <p className={cn('m-0 p-0', className)}>{children}</p>
}

function RecordData(properties: React.PropsWithChildren<RecordDataProperties>) {
  const { name, children } = properties
  return (
    <TextRow>
      <Text className="min-w-[88px]">{name}</Text>
      <Text className="font-semibold">{children}</Text>
    </TextRow>
  )
}

export function PanelKYCRecord() {
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelKYCRecord',
  })

  return (
    <div className="px-5 py-[50px]">
      <TabTitle className="mb-9">{t('tabTitle')}</TabTitle>
      <Card>
        <div className="flex flex-row items-center p-8">
          <Avatar variant="text" size="medium" src="S" />
          <div className="ml-12 flex flex-1 flex-col gap-2.5">
            <RecordData name={t('recordData.date')}>2022/5/1</RecordData>
            <RecordData name={t('recordData.holder')}>BEN5566</RecordData>
          </div>
        </div>
      </Card>
    </div>
  )
}
