'use client'

import { useState, useRef, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import CSVReader from '@/components/CSVReader'
import ColumnMappingModal from '@/components/ColumnMappingModal'
import ContactDetailsPanel from '@/components/ContactDetailsPanel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContacts } from '@/contexts/ContactsContext'

interface Contact {
  [key: string]: string;
}

interface ColumnMappings {
  name: string;
  email: string;
}

const ITEMS_PER_PAGE = 15

export default function UploadContactsPage() {
  const { contacts, setContacts, columns, setColumns } = useContacts()
  const [showMappingModal, setShowMappingModal] = useState(false)
  const [csvData, setCSVData] = useState<string[][]>([])
  const [columnMappings, setColumnMappings] = useState<ColumnMappings | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const tableRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = (data: string[][]) => {
    setCSVData(data)
    setColumns(data[0] || [])
    setShowMappingModal(true)
  }

  const handleColumnMapping = (selectedColumns: string[], mappings: ColumnMappings) => {
    const mappedContacts = csvData.slice(1).map(row => {
      const contact: Contact = {}
      selectedColumns.forEach((col) => {
        contact[col] = row[csvData[0].indexOf(col)] || ''
      })
      return contact
    })
    setContacts(mappedContacts)
    setColumnMappings(mappings)
    setShowMappingModal(false)
    setCurrentPage(1)
  }

  const totalPages = Math.max(1, Math.ceil((contacts?.length || 0) / ITEMS_PER_PAGE))
  const paginatedContacts = contacts?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || []

  useEffect(() => {
    const tableElement = tableRef.current
    if (tableElement) {
      const headerRow = tableElement.querySelector('thead tr')
      if (headerRow) {
        const headerCells = headerRow.querySelectorAll('th')
        const bodyCells = tableElement.querySelectorAll('tbody tr:first-child td')

        headerCells.forEach((cell, index) => {
          if (bodyCells[index]) {
            (cell as HTMLElement).style.width = `${bodyCells[index].clientWidth}px`
          }
        })
      }
    }
  }, [contacts, columns])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Contacts</h1>
      <p className="text-gray-600">
        Upload a CSV file containing your contacts. You'll be able to select which columns to import.
      </p>

      <CSVReader onFileLoaded={handleFileUpload} />

      {contacts && contacts.length > 0 && (
        <div className="text-lg font-semibold">
          Uploaded Contact Count: {contacts.length}
        </div>
      )}

      <div className="flex gap-6" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="w-2/3 min-w-0 border rounded-md relative">
          {!contacts || contacts.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xl text-gray-500">Please upload a contact list</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-grow overflow-hidden">
                <div className="h-full overflow-hidden" ref={tableRef}>
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableHead key={index} className="px-4 py-2">
                            {column}
                            {columnMappings && columnMappings.name === column && " (Name)"}
                            {columnMappings && columnMappings.email === column && " (Email)"}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedContacts.map((contact, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => setSelectedContact(contact)}
                        >
                          {columns.map((column, colIndex) => (
                            <TableCell key={`${rowIndex}-${colIndex}`} className="px-4 py-2">
                              <div className="max-w-[200px] truncate">
                                {contact[column]}
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="p-4 border-t bg-background">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500 text-center sm:text-left">
                    Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, contacts.length)} to {Math.min(currentPage * ITEMS_PER_PAGE, contacts.length)} of {contacts.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-1/3">
          <ContactDetailsPanel contact={selectedContact} />
        </div>
      </div>

      <ColumnMappingModal
        isOpen={showMappingModal}
        onClose={() => setShowMappingModal(false)}
        columns={columns}
        onColumnMapping={handleColumnMapping}
      />
    </div>
  )
}
