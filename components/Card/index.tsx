import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

type CardProperties = BaseComponent & {
  title?: string | null
}

export function Card({
  className,
  children,
  title,
}: React.PropsWithChildren<CardProperties>) {
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
