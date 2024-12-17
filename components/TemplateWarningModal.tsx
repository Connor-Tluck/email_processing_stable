import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface TemplateWarningModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TemplateWarningModal({ isOpen, onClose }: TemplateWarningModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Template Selection Required</ModalTitle>
        </ModalHeader>
        <p className="py-4">Please select an email template before processing.</p>
        <ModalFooter>
          <Button onClick={onClose}>OK</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

