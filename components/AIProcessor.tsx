'use client'

import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/components/ui/modal"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useTemplates } from '@/contexts/TemplateContext'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

interface Client {
  id: number
  name: string
  company: string
  role: string
  salesStage: string
  currentCustomer: string
  currentACV: string
  emailStatus: 'None' | 'AI generated' | 'Modified' | 'Error'
  email: string
}

interface AIProcessorProps {
  clients: Client[]
  onProcessComplete: (processedClients: Client[]) => void
  selectedTemplate: string
  isProcessing: boolean
}

export default function AIProcessor({ clients, onProcessComplete, selectedTemplate, isProcessing }: AIProcessorProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const { templates } = useTemplates()

  useEffect(() => {
    if (isProcessing) {
      processClients()
    }
  }, [isProcessing])

  const processClients = async () => {
    setProgress(0)
    setStatus('Initializing...')

    const processedClients = [...clients]
    const totalClients = clients.length

    for (let i = 0; i < totalClients; i++) {
      const client = processedClients[i]
      setStatus(`Processing ${client.name} (${client.company})`)

      const template = templates.find(t => t.name === selectedTemplate) || templates[0]
    
      try {
        const { text } = await generateText({
          model: openai('gpt-4o'),
          prompt: `Generate an email for ${client.name} from ${client.company} using the following template:
        
        ${template.content}
        
        Consider the following information about the client:
        Role: ${client.role}
        Current Customer: ${client.currentCustomer}
        Current ACV: ${client.currentACV}
        
        Please personalize the email based on this information.`,
          system: "You are an AI assistant tasked with generating personalized sales emails based on provided templates and client information."
        })

        client.email = text
        client.emailStatus = 'AI generated'
        client.salesStage = selectedTemplate
        console.log('OpenAI API Response:', text)
      } catch (error) {
        console.error('Error generating email:', error)
        client.email = 'Error generating email. Please try again.'
        client.emailStatus = 'Error'
      }

      setProgress(Math.round(((i + 1) / totalClients) * 100))
    }

    setStatus('Processing complete!')
    onProcessComplete(processedClients)
  }

  return (
    <Modal open={isProcessing} onOpenChange={() => {}}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>AI Processing</ModalTitle>
          <ModalDescription>{status}</ModalDescription>
        </ModalHeader>
        <div className="my-4">
          <Progress value={progress} className="w-full" />
        </div>
        <ModalFooter>
          <Button disabled>Processing...</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
