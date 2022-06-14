import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type CardProps = BaseComponent & {
  title?: string
}

export function Card({
  className,
  children,
  title,
}: React.PropsWithChildren<CardProps>) {
  return (
    <div className="box-border">
      {title && (
        <p className="m-0 mb-[10px] text-base font-bold text-[#4F4F4F]">
          {title}
        </p>
      )}
      <div
        className={classNames(
          'box-border bg-white border-[1px] border-solid border-[#BDBDBD] rounded-[10px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
