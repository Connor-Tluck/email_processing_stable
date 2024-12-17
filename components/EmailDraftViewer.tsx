'use client'

import { useState, useEffect } from 'react'

interface EmailDraftViewerProps {
  selectedClient: {
    id: number
    name: string
    company: string
    emailStatus: 'None' | 'AI generated' | 'Modified'
    email: string
  } | null
  onEmailChange: (clientId: number, email: string, status: 'Modified') => void
}

export default function EmailDraftViewer({ selectedClient, onEmailChange }: EmailDraftViewerProps) {
  const [emailDraft, setEmailDraft] = useState('')

  useEffect(() => {
    if (selectedClient) {
      setEmailDraft(selectedClient.email)
    } else {
      setEmailDraft('')
    }
  }, [selectedClient])

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = e.target.value
    setEmailDraft(newEmail)
    if (selectedClient) {
      onEmailChange(selectedClient.id, newEmail, 'Modified')
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Selected Contact Info</h3>
        <p><strong>Contact:</strong> <span id="selectedContact">{selectedClient?.name || 'None'}</span></p>
        <p><strong>Company:</strong> <span id="selectedCompany">{selectedClient?.company || 'None'}</span></p>
        <p><strong>Email Status:</strong> <span id="emailStatus" className="inline-block px-2 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full">{selectedClient?.emailStatus || 'None'}</span></p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Email Draft</h3>
        <textarea 
          id="emailDraftViewer" 
          className="w-full h-64 p-2 border rounded-md" 
          placeholder="Select a customer to view or edit their email draft"
          value={emailDraft}
          onChange={handleEmailChange}
        ></textarea>
      </div>
    </div>
  )
}

