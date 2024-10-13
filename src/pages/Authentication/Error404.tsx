import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Construction } from "lucide-react"

export default function Error404() {
  return (
    <div className="h-[100vh] bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Error 404</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Construction className="mx-auto h-40 w-40 text-yellow-500" />
            <p className="text-gray-600">
              Cette page n'existe pas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}