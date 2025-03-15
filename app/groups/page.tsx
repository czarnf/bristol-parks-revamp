import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Calendar } from "lucide-react"

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Bristol Weekend Riders",
      members: 28,
      description: "Casual weekend rides around Bristol's parks and green spaces.",
      nextRide: "Saturday, March 30 at 10:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Ashton Court Trail Blazers",
      members: 15,
      description: "Mountain biking group focused on Ashton Court trails.",
      nextRide: "Sunday, April 2 at 9:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Bristol Commuters",
      members: 42,
      description: "Group for daily commuters sharing routes and tips.",
      nextRide: "Weekdays at 8:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Family Friendly Rides",
      members: 23,
      description: "Safe, easy routes suitable for families with children.",
      nextRide: "Saturday, April 8 at 11:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const suggestedGroups = [
    { id: 1, name: "Bristol Road Cyclists", members: 56, image: "/placeholder.svg?height=60&width=60" },
    { id: 2, name: "Evening Riders Club", members: 19, image: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Groups</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={group.image || "/placeholder.svg"}
                  alt={group.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{group.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{group.members} members</span>
                  </div>
                  <p className="text-sm mb-3">{group.description}</p>
                  <div className="flex items-center text-sm text-primary-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Next ride: {group.nextRide}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Join Next Ride</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Suggested Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestedGroups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-4 flex items-center gap-3">
              <img
                src={group.image || "/placeholder.svg"}
                alt={group.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground">{group.members} members</p>
              </div>
              <Button size="sm">Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

