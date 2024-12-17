'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user && pathname !== '/login') {
      router.push('/login')
    } else if (user && pathname === '/login') {
      router.push('/')
    }
  }, [user, router, pathname])

  if (!user && pathname !== '/login') {
    return null
  }

  return <>{children}</>
}

