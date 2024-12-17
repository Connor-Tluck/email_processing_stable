'use client'

import { useState, useEffect } from 'react'
import { Modal, Progress } from '@/components/ui'

export default function ProcessingProgressModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            setStatus('Processing complete!')
            return 100
          }
          setStatus(`Processing... ${prevProgress + 10}%`)
          return prevProgress + 10
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  const startProcessing = () => {
    setIsOpen(true)
    setProgress(0)
    setStatus('Initializing...')
  }

  return (
    <>
      <button onClick={startProcessing} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Processing
      </button>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Generating AI-based Email...</Modal.Title>
          </Modal.Header>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p id="processingStatus" className="mt-3 text-center">{status}</p>
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

