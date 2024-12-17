'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function FixedFooter() {
  const [isSending, setIsSending] = useState(false)

  const handleSendSingleEmail = () => {
    setIsSending(true)
    // Simulating an API call
    setTimeout(() => {
      console.log('Single email sent')
      setIsSending(false)
    }, 2000)
  }

  const handleSendAllEmails = () => {
    setIsSending(true)
    // Simulating an API call
    setTimeout(() => {
      console.log('All emails sent')
      setIsSending(false)
    }, 3000)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 border-t border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-red-600 font-bold">DANGER: Email Send Out:</span>
        <div className="space-x-4">
          <Button 
            variant="destructive" 
            onClick={handleSendSingleEmail} 
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Single Email'}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleSendAllEmails} 
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send All Emails'}
          </Button>
        </div>
      </div>
    </div>
  )
}

