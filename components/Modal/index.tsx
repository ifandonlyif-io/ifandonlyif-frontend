import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { CheckMarkOutlineIcon, CrossMarkOutlineIcon } from '../Icons'

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
  const handleModalClose = React.useCallback(() => {
    onModalClose && onModalClose()
  }, [onModalClose])

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
              className={cn(
                'flex flex-col gap-8 rounded-xl bg-white px-20 py-8 shadow-iff-modal',
                className,
              )}
            >
              {title && (
                <Dialog.Title
                  as="h2"
                  className="text-center text-2xl font-bold text-iff-text"
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

export type CheckModalProperties = ModalProperties & {
  status: 'success' | 'error'
}

export function CheckModal(
  properties: React.PropsWithChildren<CheckModalProperties>,
) {
  const { status, children, ...others } = properties

  return (
    <Modal {...others}>
      <div className="flex flex-col items-center justify-center">
        {status === 'success' && (
          <React.Fragment>
            <CheckMarkOutlineIcon className="h-[54px] w-[54px]" />
            <h3 className="mt-2.5 text-2xl font-bold leading-normal text-iff-neon-purple">
              Congrats!
            </h3>
          </React.Fragment>
        )}
        {status === 'error' && (
          <React.Fragment>
            <CrossMarkOutlineIcon className="h-[54px] w-[54px]" />
            <h3 className="mt-2.5 text-2xl font-bold leading-normal text-iff-neon-red">
              Oops!
            </h3>
          </React.Fragment>
        )}
      </div>
      {children}
    </Modal>
  )
}
