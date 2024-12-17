import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Contact {
  [key: string]: string;
}

interface ContactDetailsPanelProps {
  contact: Contact | null;
}

export default function ContactDetailsPanel({ contact }: ContactDetailsPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        {contact ? (
          <ScrollArea className="h-[calc(100vh-300px)]">
            {Object.entries(contact).map(([key, value]) => (
              <div key={key} className="mb-4">
                <h3 className="font-semibold">{key}</h3>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <p>Select a contact to view details</p>
        )}
      </CardContent>
    </Card>
  )
}

