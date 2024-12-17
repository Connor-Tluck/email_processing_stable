'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import ItemViewer from '@/components/ItemViewer'
import FileUpload from '@/components/FileUpload'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, ChevronDown } from 'lucide-react'

interface UploadedItem {
  id: number
  fileName: string
  fileType: string
  uploadedDate: string
  lastReferencedDate: string
  contents: string
}

type SortKey = keyof UploadedItem
type SortOrder = 'asc' | 'desc'

export default function UploadedContentPage() {
  const [selectedDatabase, setSelectedDatabase] = useState('db1')
  const [selectedFileType, setSelectedFileType] = useState('all')
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'uploadedDate', order: 'desc' })
  const [uploadedData, setUploadedData] = useState<UploadedItem[]>([
    { 
      id: 1, 
      fileName: "client_list_2023.csv", 
      fileType: "CSV", 
      uploadedDate: "2023-06-15", 
      lastReferencedDate: "2023-06-20", 
      contents: "Name,Email,Company\nJohn Doe,john@example.com,Acme Inc.\nJane Smith,jane@example.com,Tech Corp\n..."
    },
    { 
      id: 2, 
      fileName: "product_catalog.json", 
      fileType: "JSON", 
      uploadedDate: "2023-06-10", 
      lastReferencedDate: "2023-06-18", 
      contents: '{"products":[{"id":1,"name":"Widget A","price":19.99},{"id":2,"name":"Gadget B","price":24.99},...]}'
    },
    { 
      id: 3, 
      fileName: "marketing_strategy.docx", 
      fileType: "DOCX", 
      uploadedDate: "2023-06-05", 
      lastReferencedDate: "2023-06-17", 
      contents: "1. Executive Summary\n2. Market Analysis\n3. Target Audience\n4. Marketing Channels\n5. Budget Allocation\n..."
    },
  ])

  const [selectedItem, setSelectedItem] = useState<UploadedItem | null>(null)

  const handleDatabaseChange = (value: string) => {
    setSelectedDatabase(value)
    // TODO: Fetch data for the selected database
    console.log(`Fetching data for ${value}`)
  }

  const handleFileTypeChange = (value: string) => {
    setSelectedFileType(value)
  }

  const handleSort = (key: SortKey) => {
    setSortConfig(prevConfig => ({
      key,
      order: prevConfig.key === key && prevConfig.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredAndSortedData = useMemo(() => {
    let result = uploadedData

    // Apply file type filter
    if (selectedFileType !== 'all') {
      result = result.filter(item => item.fileType === selectedFileType)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === 'asc' ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [uploadedData, selectedFileType, sortConfig])

  const fileTypes = useMemo(() => {
    const types = new Set(uploadedData.map(item => item.fileType))
    return ['all', ...Array.from(types)]
  }, [uploadedData])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Supplemental Data</h1>
      <p className="text-gray-600">
        This page allows you to manage supplemental data that will be used as additional source information for the email generator. 
        You can upload various types of content to enhance the context and personalization of your generated emails.
      </p>
      
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleDatabaseChange} value={selectedDatabase}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Database" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="db1">Database 1</SelectItem>
            <SelectItem value="db2">Database 2</SelectItem>
            <SelectItem value="db3">Database 3</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={handleFileTypeChange} value={selectedFileType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by File Type" />
          </SelectTrigger>
          <SelectContent>
            {fileTypes.map(type => (
              <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <FileUpload onUpload={(files) => console.log('Files uploaded:', files)} />
      </div>

      <div className="flex gap-6">
        <div className="w-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                {['fileName', 'fileType', 'uploadedDate', 'lastReferencedDate'].map((key) => (
                  <TableHead key={key} onClick={() => handleSort(key as SortKey)} className="cursor-pointer">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      sortConfig.order === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                    )}
                  </TableHead>
                ))}
                <TableHead>Contents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item) => (
                <TableRow 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{item.fileName}</TableCell>
                  <TableCell>{item.fileType}</TableCell>
                  <TableCell>{item.uploadedDate}</TableCell>
                  <TableCell>{item.lastReferencedDate}</TableCell>
                  <TableCell>
                    <ScrollArea className="h-[100px] w-[200px]">
                      <div className="whitespace-pre-wrap">{item.contents}</div>
                    </ScrollArea>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/3">
          <ItemViewer item={selectedItem} />
        </div>
      </div>
    </div>
  )
}
