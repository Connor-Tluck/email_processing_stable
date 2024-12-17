'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { User } from '@/contexts/AuthContext'

interface NotificationsTabProps {
  user: User
}

export default function NotificationsTab({ user }: NotificationsTabProps) {
  const [emailNotifications, setEmailNotifications] = useState({
    marketing: true,
    security: true,
    updates: false
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="marketing" className="font-medium">Marketing emails</Label>
            <p className="text-sm text-gray-500">Receive emails about new features and special offers</p>
          </div>
          <Switch
            id="marketing"
            checked={emailNotifications.marketing}
            onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, marketing: checked }))}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="security" className="font-medium">Security updates</Label>
            <p className="text-sm text-gray-500">Receive emails about your account security</p>
          </div>
          <Switch
            id="security"
            checked={emailNotifications.security}
            onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, security: checked }))}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="updates" className="font-medium">Product updates</Label>
            <p className="text-sm text-gray-500">Receive emails about product updates and changes</p>
          </div>
          <Switch
            id="updates"
            checked={emailNotifications.updates}
            onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, updates: checked }))}
          />
        </div>
      </CardContent>
    </Card>
  )
}

