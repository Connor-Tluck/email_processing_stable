'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProtectedRoute from '@/components/ProtectedRoute'
import ProfileTab from '@/components/account/ProfileTab'
import BillingTab from '@/components/account/BillingTab'
import SecurityTab from '@/components/account/SecurityTab'
import NotificationsTab from '@/components/account/NotificationsTab'

export default function MyAccountPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="profile" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2 font-semibold"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2 font-semibold"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2 font-semibold"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2 font-semibold"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab user={user} />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab user={user} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab user={user} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
