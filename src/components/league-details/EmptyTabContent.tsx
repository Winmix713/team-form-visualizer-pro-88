
"use client"

import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyTabContentProps {
  message: string
}

export function EmptyTabContent({ message }: EmptyTabContentProps) {
  return (
    <Card className="bg-black/20 border-white/5">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="h-8 w-8 text-gray-500" />
          <p className="text-gray-400">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}
