import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Construction } from "lucide-react"

export default function SynthesePage() {
  return (
    <div className="h-[80vh] bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Synthèse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Construction className="mx-auto h-16 w-16 text-yellow-500" />
            <h2 className="text-xl font-semibold">Bienvenue aux utilisateurs</h2>
            <p className="text-gray-600">
              Cette page est en cours de développement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}