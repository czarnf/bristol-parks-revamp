import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function UpcomingRidesPage() {
  const upcomingRides = [
    {
      id: 1,
      title: "Ashton Court Weekend Ride",
      date: "Saturday, March 30, 2024",
      time: "10:00 AM",
      location: "Ashton Court Estate",
      participants: 12,
      description: "A leisurely ride through Ashton Court Estate, suitable for all skill levels.",
    },
    {
      id: 2,
      title: "Bristol Harbour Circuit",
      date: "Sunday, April 2, 2024",
      time: "9:30 AM",
      location: "Millennium Square",
      participants: 8,
      description: "Scenic ride around Bristol Harbour with stops at key landmarks.",
    },
    {
      id: 3,
      title: "Leigh Woods Trail Exploration",
      date: "Wednesday, April 5, 2024",
      time: "5:30 PM",
      location: "Leigh Woods Car Park",
      participants: 6,
      description: "After-work ride through the beautiful trails of Leigh Woods.",
    },
    {
      id: 4,
      title: "The Downs Loop",
      date: "Saturday, April 8, 2024",
      time: "11:00 AM",
      location: "Clifton Suspension Bridge",
      participants: 15,
      description: "Family-friendly ride around The Downs with a picnic stop.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Rides</h1>
        <Button>Create New Ride</Button>
      </div>

      <div className="space-y-4">
        {upcomingRides.map((ride) => (
          <Card key={ride.id}>
            <CardHeader>
              <CardTitle>{ride.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{ride.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{ride.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{ride.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{ride.participants} participants</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">{ride.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Join Ride</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

