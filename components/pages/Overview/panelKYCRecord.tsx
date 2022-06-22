import { Avatar } from 'components/Avatar'
import { Card } from 'components/Card'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

import { TabTitle } from './title'

type RecordDataProps = { name: string }

function TextRow(props: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = props
  return (
    <div
      className={classNames(
        'flex flex-row items-center text-base text-black',
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

function RecordData(props: React.PropsWithChildren<RecordDataProps>) {
  const { name, children } = props
  return (
    <TextRow>
      <Text className="min-w-[88px]">{name}</Text>
      <Text className="font-semibold">{children}</Text>
    </TextRow>
  )
}

export function PanelKYCRecord() {
  return (
    <div className="py-[50px] px-5">
      <TabTitle className="mb-9">MY KYC RECORD</TabTitle>
      <Card>
        <div className="flex flex-row items-center p-8">
          <Avatar variant="text" size="medium" src="S" />
          <div className="flex flex-col flex-1 gap-[10px] ml-12">
            <RecordData name="Date">2022/5/1</RecordData>
            <RecordData name="Holder">BEN5566</RecordData>
          </div>
        </div>
      </Card>
    </div>
  )
}
