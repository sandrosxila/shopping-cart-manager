import { ModalContext } from '@/contexts/modal-context'
import React, { useState } from 'react'

export const ModalProvider = ({ children } : React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);


  const openModal = () => {
    setOpen(true);
  }

  return (
    <ModalContext.Provider value={
      {
        openModal
      }
    }>
      { children }
    </ModalContext.Provider>
  )
}
