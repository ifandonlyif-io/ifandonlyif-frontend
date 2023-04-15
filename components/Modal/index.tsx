import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

export type ModalProperties = BaseComponent & {
  isOpen?: boolean
  onModalClose?: () => void
}

export function Modal(properties: React.PropsWithChildren<ModalProperties>) {
  const { className, children, isOpen = false, onModalClose } = properties
  const handleModalClose = React.useCallback(
    () => onModalClose && onModalClose(),
    [onModalClose]
  )
  // eslint-disable-next-line unicorn/no-null
  if (!isOpen) return null

  return (
    <div className="block">
      <div
        className="fixed left-0 top-0 h-full w-full bg-black/70"
        onClick={handleModalClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={classNames(
            'bg-white rounded-[10px] shadow-iff-modal',
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
