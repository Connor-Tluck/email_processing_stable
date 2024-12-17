'use client'

import { Button } from '@/components/ui/button'

export default function AIProcessModal() {
  const handleAIProcess = () => {
    console.log('AI Process clicked')
    // TODO: Implement AI processing logic
  }

  return (
    <Button onClick={handleAIProcess}>AI Process</Button>
  )
}

