import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function ParkNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="bg-muted rounded-full p-6 mb-6">
        <MapPin className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Park Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the park you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <Button asChild>
        <Link href="/explore">Explore All Parks</Link>
      </Button>
    </div>
  )
}

