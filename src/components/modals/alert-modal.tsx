'use client'
import React from 'react'

import { Button } from '../ui/button'
import Modal from '../ui/modal'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal = ({ isOpen, loading, onClose, onConfirm }: Props) => {
  return (
    <Modal title='Are you sure?' description='This action cannot be undone.' isOpen={isOpen} onClose={onClose}>
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button variant='outline' disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant='destructive' disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
