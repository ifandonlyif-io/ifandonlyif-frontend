import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

export type ModalProps = BaseComponent & {
  isOpen?: boolean
  onModalClose?: () => void
}

export function Modal(props: React.PropsWithChildren<ModalProps>) {
  const { className, children, isOpen = false, onModalClose } = props
  const handleModalClose = React.useCallback(
    () => onModalClose && onModalClose(),
    [onModalClose]
  )
  if (!isOpen) return null

  return (
    <div className="block">
      <div
        className="fixed top-0 left-0 h-full w-full bg-black/70"
        onClick={handleModalClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
