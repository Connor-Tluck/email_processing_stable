'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import Papa from 'papaparse'

interface CSVReaderProps {
  onFileLoaded: (data: string[][]) => void
}

export default function CSVReader({ onFileLoaded }: CSVReaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      parseCSV(selectedFile)
    }
  }

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        onFileLoaded(results.data as string[][])
      },
      error: (error) => {
        console.error('Error parsing CSV:', error)
      }
    })
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleButtonClick}>
        {file ? 'Change File' : 'Upload CSV'}
      </Button>
      {file && <span className="text-sm text-gray-500">{file.name}</span>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
    </div>
  )
}

