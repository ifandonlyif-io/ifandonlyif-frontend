import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Button } from '../Buttons'
import { Modal } from './index'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Modal>

const ModalWithHooks = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpen = React.useCallback(() => setIsOpen(true), [])
  const handleClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <div className="flex flex-col gap-5 p-5">
      <Button className="w-[100px]" onClick={handleOpen}>
        Open
      </Button>
      <Modal
        className="flex flex-col items-center"
        isOpen={isOpen}
        onModalClose={handleClose}
      >
        <div className="p-40">Content</div>
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: () => <ModalWithHooks />,
}
