import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

export type ModalProperties = BaseComponent & {
  title?: string
  isOpen?: boolean
  onModalClose?: () => void
}

export function Modal(properties: React.PropsWithChildren<ModalProperties>) {
  const {
    className,
    children,
    title,
    isOpen = false,
    onModalClose,
  } = properties
  const handleModalClose = React.useCallback(
    () => onModalClose && onModalClose(),
    [onModalClose]
  )

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} onClose={handleModalClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={classNames(
                'bg-white rounded-[10px] shadow-iff-modal',
                className
              )}
            >
              {title && (
                <Dialog.Title
                  as="h2"
                  className="mb-8 text-center text-2xl font-bold text-iff-text"
                >
                  {title}
                </Dialog.Title>
              )}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
