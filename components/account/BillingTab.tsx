'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from '@/contexts/AuthContext'
import { CreditCard } from 'lucide-react'

interface BillingTabProps {
  user: User
}

interface PaymentMethod {
  id: string
  type: 'visa' | 'mastercard' | 'amex'
  last4: string
  expiryDate: string
  isDefault: boolean
}

export default function BillingTab({ user }: BillingTabProps) {
  const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'visa', last4: '1234', expiryDate: '04/2024', isDefault: true },
    { id: '2', type: 'mastercard', last4: '5678', expiryDate: '05/2022', isDefault: false },
    { id: '3', type: 'amex', last4: '9012', expiryDate: '01/2026', isDefault: false },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden border-l-4 border-blue-500">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Current monthly bill</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">$20.00</span>
            </div>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              Switch to yearly billing →
            </a>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-purple-500">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Next payment due</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">July 15</span>
            </div>
            <a href="#" className="mt-4 inline-block text-purple-600 hover:text-purple-700">
              View payment history →
            </a>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-green-500">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Current plan</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">Freelancer</span>
            </div>
            <a href="#" className="mt-4 inline-block text-green-600 hover:text-green-700">
              Upgrade plan →
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Payment Methods</h3>
            <Button>Add Payment Method</Button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {method.isDefault ? (
                    <span className="text-sm text-gray-500">Default</span>
                  ) : (
                    <Button variant="ghost" className="text-sm text-gray-500">Make Default</Button>
                  )}
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

