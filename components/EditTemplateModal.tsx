'use client'

import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Template {
  id: number
  name: string
  description: string
  content: string
}

interface EditTemplateModalProps {
  template: Template
  onSave: (editedTemplate: Template) => void
  onClose: () => void
}

export default function EditTemplateModal({ template, onSave, onClose }: EditTemplateModalProps) {
  const [editedTemplate, setEditedTemplate] = useState<Template>(template)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedTemplate(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(editedTemplate)
  }

  return (
    <Modal open={true} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Template</ModalTitle>
          <ModalDescription>Make changes to your email template here.</ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              name="name"
              value={editedTemplate.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              name="description"
              value={editedTemplate.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={editedTemplate.content}
              onChange={handleInputChange}
              className="col-span-3"
              rows={10}
            />
          </div>
        </div>
        <ModalFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

