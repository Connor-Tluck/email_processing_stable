'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

export interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  organization?: string
  location?: string
  phone?: string
  birthday?: string
  planType: 'free' | 'premium'
  credits: number
  maxCredits: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd validate against a backend.
    if (email === 'user@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        firstName: 'John',
        lastName: 'Doe',
        organization: 'Acme Inc',
        location: 'San Francisco, CA',
        planType: 'free',
        credits: 100,
        maxCredits: 1000
      }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

