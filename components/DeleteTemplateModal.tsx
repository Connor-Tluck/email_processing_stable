'use client'

import { Button } from "@/components/ui/button"
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/components/ui/modal"

interface DeleteTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  templateName: string
}

export default function DeleteTemplateModal({ isOpen, onClose, onConfirm, templateName }: DeleteTemplateModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Template</ModalTitle>
          <ModalDescription>
            Are you sure you want to delete the template "{templateName}"? This action cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

