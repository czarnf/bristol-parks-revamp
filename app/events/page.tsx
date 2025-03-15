import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    name: "Bristol Green Ride",
    date: "2023-03-20",
    time: "09:00 AM",
    location: "Castle Park",
    participants: 50,
    description: "A scenic ride through Bristol's green spaces",
  },
  {
    id: 2,
    name: "Night Ride Adventure",
    date: "2023-03-25",
    time: "08:00 PM",
    location: "Millennium Square",
    participants: 30,
    description: "Explore Bristol's nighttime beauty on two wheels",
  },
  {
    id: 3,
    name: "Family Fun Ride",
    date: "2023-04-02",
    time: "10:00 AM",
    location: "The Downs",
    participants: 100,
    description: "A leisurely ride suitable for all ages",
  },
]

export default function EventsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <Button>Create Event</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  {event.participants} participants
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <Button className="w-full mt-4">Join Event</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

