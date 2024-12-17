import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface UploadedItem {
  id: number
  fileName: string
  fileType: string
  uploadedDate: string
  lastReferencedDate: string
  contents: string
}

interface ItemViewerProps {
  item: UploadedItem | null
}

export default function ItemViewer({ item }: ItemViewerProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Item Details</CardTitle>
      </CardHeader>
      <CardContent>
        {item ? (
          <ScrollArea className="h-[calc(100vh-400px)]">
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">File Name:</dt>
                <dd>{item.fileName}</dd>
              </div>
              <div>
                <dt className="font-semibold">File Type:</dt>
                <dd>{item.fileType}</dd>
              </div>
              <div>
                <dt className="font-semibold">Uploaded Date:</dt>
                <dd>{item.uploadedDate}</dd>
              </div>
              <div>
                <dt className="font-semibold">Last Referenced Date:</dt>
                <dd>{item.lastReferencedDate}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contents:</dt>
                <dd>
                  <pre className="text-sm whitespace-pre-wrap">{item.contents}</pre>
                </dd>
              </div>
            </dl>
          </ScrollArea>
        ) : (
          <p>Select an item to view its details</p>
        )}
      </CardContent>
    </Card>
  )
}

