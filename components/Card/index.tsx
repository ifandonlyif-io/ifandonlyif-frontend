import React from 'react'

import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

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
        <h4 className="m-0 mb-2.5 text-base font-bold text-iff-text">
          {title}
        </h4>
      )}
      <div
        className={cn(
          'box-border rounded-xl border border-solid border-[#BDBDBD] bg-white',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
