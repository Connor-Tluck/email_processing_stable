'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface Template {
  id: number
  name: string
  description: string
  content: string
}

interface TemplateContextType {
  templates: Template[]
  addTemplate: (template: Omit<Template, 'id'>) => void
  updateTemplate: (template: Template) => void
  deleteTemplate: (id: number) => void
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

export const useTemplates = () => {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider')
  }
  return context
}

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "Cold Outreach",
      description: "Initial contact for potential clients interested in aerial imagery",
      content: `Dear [Name],

I came across [Company Name]'s recent work on [specific project or achievement] and was impressed by your approach to [relevant industry topic]. I believe our aerial imagery solutions could bring significant value to your upcoming projects.

Our high-resolution aerial maps and 3D models have helped companies like yours improve project planning, reduce site visits, and make more informed decisions.

Would you be open to a quick chat about how we could support your upcoming projects?

Best regards,
[Your Name]
[Your Company]`
    },
    {
      id: 2,
      name: "Meeting Request",
      description: "Request for a meeting to discuss aerial imagery services",
      content: `Hello [Name],

Following our recent conversation about [Company Name]'s aerial imaging needs, I'd like to suggest a brief meeting to explore how we can help in more detail.

I have some specific ideas about optimizing your [specific project or need mentioned in previous communication] that I'm eager to share.

Would you have 30 minutes available next week? I'm free on [Day 1] or [Day 2] if either works for you.

Looking forward to speaking with you,
[Your Name]
[Your Company]`
    },
    {
      id: 3,
      name: "Follow-up",
      description: "Follow-up email after initial contact or meeting",
      content: `Hi [Name],

I wanted to touch base regarding our discussion about aerial imagery solutions for [Company Name].

To recap, we covered:
1. Your need for [specific requirement, e.g., "high-resolution mapping of your construction site"]
2. Our ability to provide [specific solution, e.g., "weekly progress tracking with 2cm accuracy"]

I'm confident we can deliver exceptional results for your project. Is there any additional information you need from us to move forward?

Best regards,
[Your Name]
[Your Company]`
    },
  ])

  const addTemplate = (newTemplate: Omit<Template, 'id'>) => {
    const newId = Math.max(...templates.map(t => t.id), 0) + 1
    setTemplates([...templates, { ...newTemplate, id: newId }])
  }

  const updateTemplate = (updatedTemplate: Template) => {
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t))
  }

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  return (
    <TemplateContext.Provider value={{ templates, addTemplate, updateTemplate, deleteTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}

