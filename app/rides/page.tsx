import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, TrendingUp } from "lucide-react"

const rides = [
  {
    id: 1,
    name: "Morning Commute",
    date: "2023-03-15",
    duration: "25 min",
    distance: "5.2 km",
    route: "Home to Office",
  },
  {
    id: 2,
    name: "Ashton Court Loop",
    date: "2023-03-14",
    duration: "1h 15min",
    distance: "18.7 km",
    route: "Ashton Court",
  },
  {
    id: 3,
    name: "Evening Ride",
    date: "2023-03-13",
    duration: "45 min",
    distance: "9.3 km",
    route: "City Center Loop",
  },
  {
    id: 4,
    name: "Weekend Adventure",
    date: "2023-03-12",
    duration: "2h 30min",
    distance: "35.1 km",
    route: "Bristol to Bath",
  },
]

export default function RidesPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Rides</h1>
        <Button>Log New Ride</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((ride) => (
          <Card key={ride.id}>
            <CardHeader>
              <CardTitle>{ride.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {ride.date}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  {ride.duration}
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  {ride.distance}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {ride.route}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

