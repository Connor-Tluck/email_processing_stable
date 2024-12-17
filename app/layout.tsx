import '@/styles/globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import { TemplateProvider } from '@/contexts/TemplateContext'
import { ContactsProvider } from '@/contexts/ContactsContext'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'

export const metadata: Metadata = {
  title: 'Email Automation',
  description: 'Sales Email Automation Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TemplateProvider>
            <ContactsProvider>
              <AuthenticatedLayout>
                {children}
              </AuthenticatedLayout>
            </ContactsProvider>
          </TemplateProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'