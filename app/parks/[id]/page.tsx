import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Define the parks data directly in this file to ensure it's available
const parks = [
  {
    id: "1",
    name: "Ashton Court Estate",
    description: "Large estate with deer park and mountain biking trails.",
    address: "Long Ashton, Bristol BS41 9JN",
    openingHours: "7:00 AM - 9:00 PM",
    facilities: ["Mountain bike trails", "Café", "Parking", "Toilets"],
    popularRoutes: [
      { name: "Ashton Court Loop", distance: "5.2 km", difficulty: "Easy" },
      { name: "Mountain Bike Red Route", distance: "6.8 km", difficulty: "Intermediate" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png",
  },
  {
    id: "2",
    name: "The Downs",
    description: "Expansive parkland with walking and cycling paths.",
    address: "Stoke Road, Bristol BS9 1FG",
    openingHours: "Open 24 hours",
    facilities: ["Cycling paths", "Open spaces", "Picnic areas", "Sports fields"],
    popularRoutes: [
      { name: "Downs Circuit", distance: "4.5 km", difficulty: "Easy" },
      { name: "Clifton Observatory Loop", distance: "3.2 km", difficulty: "Easy" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png",
  },
  {
    id: "3",
    name: "Blaise Castle Estate",
    description: "Historic estate with castle, museum and nature trails.",
    address: "Kings Weston Road, Bristol BS10 7QS",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["Historic sites", "Nature trails", "Museum", "Playground", "Café"],
    popularRoutes: [
      { name: "Castle Trail", distance: "3.8 km", difficulty: "Moderate" },
      { name: "Woodland Path", distance: "2.5 km", difficulty: "Easy" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png",
  },
  {
    id: "4",
    name: "Leigh Woods",
    description: "National Trust woodland with cycling and walking trails.",
    address: "Valley Road, Bristol BS8 3QB",
    openingHours: "Dawn to Dusk",
    facilities: ["Mountain biking", "Walking trails", "Viewpoints", "Parking"],
    popularRoutes: [
      { name: "Purple Trail", distance: "7.2 km", difficulty: "Challenging" },
      { name: "Nightingale Valley", distance: "4.1 km", difficulty: "Moderate" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png",
  },
  {
    id: "5",
    name: "Brandon Hill Nature Park",
    description: "City center park with Cabot Tower and great views.",
    address: "Park Street, Bristol BS1 5RR",
    openingHours: "8:00 AM - 7:00 PM",
    facilities: ["Viewpoints", "Historic tower", "Nature reserve", "Gardens"],
    popularRoutes: [
      { name: "Cabot Tower Loop", distance: "1.5 km", difficulty: "Easy" },
      { name: "Brandon Hill Circuit", distance: "2.0 km", difficulty: "Easy" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png",
  },
]

export default function ParkPage({ params }: { params: { id: string } }) {
  // Find the park by ID (using string comparison instead of parseInt)
  const park = parks.find((p) => p.id === params.id)

  // If park not found, return 404
  if (!park) {
    notFound()
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">{park.name}</h1>

      <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-8">
        <Image
          src={park.image || "/placeholder.svg"}
          alt={`View of ${park.name}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-lg mb-4">{park.description}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{park.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{park.openingHours}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {park.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Cycling Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {park.popularRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{route.name}</h3>
                  <p className="text-sm text-muted-foreground">Distance: {route.distance}</p>
                </div>
                <div className="text-sm font-medium">{route.difficulty}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/explore">Back to Explore</Link>
        </Button>
      </div>
    </div>
  )
}

// Generate static params for all parks to improve performance
export function generateStaticParams() {
  return parks.map((park) => ({
    id: park.id,
  }))
}

