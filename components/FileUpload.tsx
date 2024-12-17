'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onUpload: (files: FileList) => void
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setFileName(files[0].name)
      onUpload(files)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleButtonClick}>
        {fileName ? 'Change File' : 'Upload File'}
      </Button>
      {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

