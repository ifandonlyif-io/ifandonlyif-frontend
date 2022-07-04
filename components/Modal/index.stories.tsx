import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Modal } from './index'

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

export const Default: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpen = React.useCallback(() => setIsOpen(true), [])
  const handleClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <div className="flex flex-col gap-5 p-5">
      <button onClick={handleOpen}>Open</button>
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
