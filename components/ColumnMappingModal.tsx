'use client'

import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ColumnMappingModalProps {
  isOpen: boolean
  onClose: () => void
  columns: string[]
  onColumnMapping: (selectedColumns: string[], columnMappings: { name: string, email: string }) => void
}

export default function ColumnMappingModal({ isOpen, onClose, columns, onColumnMapping }: ColumnMappingModalProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns)
  const [nameColumn, setNameColumn] = useState<string>('')
  const [emailColumn, setEmailColumn] = useState<string>('')

  const validColumns = columns.filter(column => column.trim() !== '');

  useEffect(() => {
    setSelectedColumns(validColumns)
  }, [columns])

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
        : [...prev, column]
    )
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedColumns(checked ? validColumns : [])
  }

  const handleSave = () => {
    if (!nameColumn || !emailColumn) {
      alert("Please select both name and email columns.")
      return
    }
    onColumnMapping(selectedColumns, { name: nameColumn, email: emailColumn })
    onClose()
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent aria-describedby="column-mapping-description" className="max-h-[90vh] overflow-hidden flex flex-col">
        <ModalHeader>
          <ModalTitle>Select Columns to Import</ModalTitle>
          <ModalDescription id="column-mapping-description">
            Choose which columns from your CSV file you want to import. Name and Email are required.
          </ModalDescription>
        </ModalHeader>
        <ScrollArea className="flex-grow">
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedColumns.length === validColumns.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              />
              <Label htmlFor="select-all">Select All</Label>
            </div>
            {validColumns.map((column) => (
              <div key={column} className="flex items-center space-x-2">
                <Checkbox
                  id={column}
                  checked={selectedColumns.includes(column)}
                  onCheckedChange={() => handleColumnToggle(column)}
                />
                <Label htmlFor={column}>{column}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-column">Select Name Column (Required)</Label>
              <Select value={nameColumn} onValueChange={setNameColumn}>
                <SelectTrigger id="name-column">
                  <SelectValue placeholder="Select name column" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {validColumns.map((column) => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-column">Select Email Column (Required)</Label>
              <Select value={emailColumn} onValueChange={setEmailColumn}>
                <SelectTrigger id="email-column">
                  <SelectValue placeholder="Select email column" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {validColumns.map((column) => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Import Selected Columns</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

