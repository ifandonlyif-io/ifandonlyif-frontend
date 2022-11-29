import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type CardProps = BaseComponent & {
  title?: string | null
}

export function Card({
  className,
  children,
  title,
}: React.PropsWithChildren<CardProps>) {
  return (
    <div className="box-border">
      {title && (
        <h4 className="m-0 mb-[10px] text-base font-bold text-iff-text">
          {title}
        </h4>
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
