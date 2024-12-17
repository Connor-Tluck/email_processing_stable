'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface Contact {
  [key: string]: string;
}

interface ContactsContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined)

export const useContacts = () => {
  const context = useContext(ContactsContext)
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider')
  }
  return context
}

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [columns, setColumns] = useState<string[]>([])

  return (
    <ContactsContext.Provider value={{ contacts, setContacts, columns, setColumns }}>
      {children}
    </ContactsContext.Provider>
  )
}

