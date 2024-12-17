'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EditTemplateModal from '@/components/EditTemplateModal'
import AddTemplateModal from '@/components/AddTemplateModal'
import DeleteTemplateModal from '@/components/DeleteTemplateModal'
import { useTemplates, Template } from '@/contexts/TemplateContext'
import { PlusCircle } from 'lucide-react'

export default function TemplatesPage() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplates()
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [isAddingTemplate, setIsAddingTemplate] = useState(false)
  const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null)

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template)
  }

  const handleSaveTemplate = (editedTemplate: Template) => {
    updateTemplate(editedTemplate)
    setEditingTemplate(null)
  }

  const handleAddTemplate = (newTemplate: Omit<Template, 'id'>) => {
    addTemplate(newTemplate)
    setIsAddingTemplate(false)
  }

  const handleDeleteTemplate = (template: Template) => {
    setDeletingTemplate(template)
  }

  const confirmDeleteTemplate = () => {
    if (deletingTemplate) {
      deleteTemplate(deletingTemplate.id)
      setDeletingTemplate(null)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Email Templates</h1>
      <p className="text-gray-600">
        This is where you can manage your email templates.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setIsAddingTemplate(true)}>
          <CardHeader>
            <CardTitle>Create New Template</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">Click here to create a new email template</p>
          </CardContent>
          <CardFooter className="flex justify-center items-center h-24">
            <Button variant="ghost" className="h-16 w-16">
              <PlusCircle className="h-12 w-12 text-black" />
            </Button>
          </CardFooter>
        </Card>
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-3">{template.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleEditTemplate(template)}>Edit Template</Button>
              <Button variant="destructive" onClick={() => handleDeleteTemplate(template)} className="ml-2">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingTemplate && (
        <EditTemplateModal
          template={editingTemplate}
          onSave={handleSaveTemplate}
          onClose={() => setEditingTemplate(null)}
        />
      )}
      {isAddingTemplate && (
        <AddTemplateModal
          onSave={handleAddTemplate}
          onClose={() => setIsAddingTemplate(false)}
        />
      )}
      {deletingTemplate && (
        <DeleteTemplateModal
          isOpen={!!deletingTemplate}
          onClose={() => setDeletingTemplate(null)}
          onConfirm={confirmDeleteTemplate}
          templateName={deletingTemplate.name}
        />
      )}
    </div>
  )
}
