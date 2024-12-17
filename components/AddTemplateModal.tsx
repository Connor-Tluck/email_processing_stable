'use client'

import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Template {
  name: string
  description: string
  content: string
}

interface AddTemplateModalProps {
  onSave: (newTemplate: Template) => void
  onClose: () => void
}

export default function AddTemplateModal({ onSave, onClose }: AddTemplateModalProps) {
  const [newTemplate, setNewTemplate] = useState<Template>({
    name: '',
    description: '',
    content: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTemplate(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(newTemplate)
  }

  return (
    <Modal open={true} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add New Template</ModalTitle>
          <ModalDescription>Create a new email template here.</ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              name="name"
              value={newTemplate.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              name="description"
              value={newTemplate.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={newTemplate.content}
              onChange={handleInputChange}
              className="col-span-3"
              rows={10}
            />
          </div>
        </div>
        <ModalFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save template</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

