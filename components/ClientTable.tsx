'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Template {
  id: number
  name: string
}

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

interface ClientTableProps {
  onClientSelect: (client: Client) => void
  onClientUpdate: (updatedClient: Client) => void
  templates: Template[]
  companies: string[]
  clients: Client[]
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  onAIProcess: () => void
}

export default function ClientTable({ 
  onClientSelect, 
  onClientUpdate, 
  templates, 
  companies, 
  clients: initialClients,
  selectedTemplate,
  setSelectedTemplate,
  onAIProcess
}: ClientTableProps) {
  const [companyFilter, setCompanyFilter] = useState('all')
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [filteredClients, setFilteredClients] = useState<Client[]>(initialClients)

  useEffect(() => {
    setClients(initialClients)
    setFilteredClients(initialClients)
  }, [initialClients])

  useEffect(() => {
    let filtered = clients
    if (companyFilter !== 'all') {
      filtered = filtered.filter(client => client.company === companyFilter)
    }
    setFilteredClients(filtered)
  }, [clients, companyFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'None':
        return <Badge variant="secondary">None</Badge>
      case 'AI generated':
        return <Badge variant="warning">AI Generated</Badge>
      case 'Modified':
        return <Badge variant="success">User Modified</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center">
          <label htmlFor="emailtype" className="mr-2">Email Template:</label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Email Template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.name}>{template.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <label htmlFor="companyFilter" className="mr-2">Filter by Company:</label>
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button id="exportBtn" onClick={() => console.log('Export clicked')}>Export</Button>
        <Button onClick={onAIProcess}>AI Process</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Target Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Sales Stage</TableHead>
              <TableHead>Current Customer</TableHead>
              <TableHead>Current ACV</TableHead>
              <TableHead>Email Status</TableHead>
              <TableHead className="w-[300px]">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow 
                key={client.id}
                onClick={() => onClientSelect(client)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="p-2">
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.name}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.company}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.role}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.salesStage}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.currentCustomer}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{client.currentACV}</TableCell>
                <TableCell className="p-2 max-h-[100px] overflow-hidden">{getStatusBadge(client.emailStatus)}</TableCell>
                <TableCell className="p-2 max-h-[100px]">
                  <ScrollArea className="h-[100px] w-[280px]">
                    <div className="whitespace-pre-wrap">{client.email}</div>
                  </ScrollArea>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

