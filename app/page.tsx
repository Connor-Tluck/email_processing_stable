'use client'

import { useState, useEffect } from 'react'
import ClientTable from '@/components/ClientTable'
import EmailDraftViewer from '@/components/EmailDraftViewer'
import FixedFooter from '@/components/FixedFooter'
import { useTemplates } from '@/contexts/TemplateContext'
import AddEnvironmentVariables from '@/components/AddEnvironmentVariables'
import TemplateWarningModal from '@/components/TemplateWarningModal'
import AIProcessor from '@/components/AIProcessor'

interface Client {
  id: number
  name: string
  company: string
  role: string
  salesStage: string
  currentCustomer: string
  currentACV: string
  emailStatus: 'None' | 'AI generated' | 'Modified'
  email: string
}

export default function Home() {
  const { templates } = useTemplates()
  const [clients, setClients] = useState<Client[]>([])
  const [companies, setCompanies] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Fetch clients
    // This would typically be an API call
    const fetchedClients: Client[] = [
      { id: 1, name: "John Doe", company: "Company A", role: "Manager", salesStage: "Cold Outreach", currentCustomer: "No", currentACV: "$0", emailStatus: "None", email: "" },
      { id: 2, name: "Jane Smith", company: "Company B", role: "Director", salesStage: "Meeting Request", currentCustomer: "Yes", currentACV: "$10,000", emailStatus: "None", email: "" },
      { id: 3, name: "Bob Johnson", company: "Company C", role: "CEO", salesStage: "Follow-up", currentCustomer: "Yes", currentACV: "$50,000", emailStatus: "None", email: "" },
    ]
    setClients(fetchedClients)

    // Extract unique companies
    const uniqueCompanies = Array.from(new Set(fetchedClients.map(client => client.company)))
    setCompanies(uniqueCompanies)
  }, [])

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
  }

  const handleClientUpdate = (updatedClient: Client) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      )
    )
    if (selectedClient && selectedClient.id === updatedClient.id) {
      setSelectedClient(updatedClient)
    }
  }

  const handleEmailChange = (clientId: number, email: string, status: 'Modified') => {
    const updatedClient = clients.find(client => client.id === clientId)
    if (updatedClient) {
      const newClient = { ...updatedClient, email, emailStatus: status }
      handleClientUpdate(newClient)
    }
  }

  const handleProcessComplete = (processedClients: Client[]) => {
    setClients(processedClients)
    setIsProcessing(false)
  }

  const handleAIProcess = () => {
    if (!selectedTemplate) {
      setShowWarningModal(true)
    } else {
      setIsProcessing(true)
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <AddEnvironmentVariables
        names={["OPENAI_API_KEY", "GOOGLE_API_KEY", "EMAIL_API_KEY"]}
        values={{
          OPENAI_API_KEY: "your_key",
          GOOGLE_API_KEY: "your-google-api-key",
          EMAIL_API_KEY: "your-email-api-key"
        }}
      />
      <h1 className="text-3xl font-bold text-center">Sales Email Automation</h1>
      <h1 className="text-3xl font-bold">Welcome to Email Automation</h1>
      <p className="text-gray-600">
        This is your dashboard for managing email templates, contacts, and supplemental data.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientTable 
            onClientSelect={handleClientSelect} 
            onClientUpdate={handleClientUpdate}
            templates={templates}
            companies={companies}
            clients={clients}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            onAIProcess={handleAIProcess}
          />
        </div>
        <div className="lg:col-span-1">
          <EmailDraftViewer 
            selectedClient={selectedClient} 
            onEmailChange={handleEmailChange}
          />
        </div>
      </div>

      <AIProcessor 
        clients={clients}
        onProcessComplete={handleProcessComplete}
        selectedTemplate={selectedTemplate}
        isProcessing={isProcessing}
      />

      <TemplateWarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
      />

      <FixedFooter />
    </div>
  )
}
