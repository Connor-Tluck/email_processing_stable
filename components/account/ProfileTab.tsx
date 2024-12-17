'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from '@/contexts/AuthContext'

interface ProfileTabProps {
  user: User
}

export default function ProfileTab({ user }: ProfileTabProps) {
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    organization: user.organization || '',
    location: user.location || '',
    email: user.email,
    phone: user.phone || '',
    birthday: user.birthday || ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form data:', formData)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1200px]">
      <Card className="w-full md:w-[400px]">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-6">Profile Picture</h2>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-40 h-40">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-500">
              JPG or PNG no larger than 5 MB
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Upload new image</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-6">Account Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username (how your name will appear to other users on the site)</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization name</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

