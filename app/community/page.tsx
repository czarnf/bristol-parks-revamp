import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const members = [
  { id: 1, name: "Alice Johnson", avatar: "/avatar1.png", status: "Just completed a 20km ride!" },
  { id: 2, name: "Bob Smith", avatar: "/avatar2.png", status: "Looking for riding buddies this weekend" },
  { id: 3, name: "Carol Williams", avatar: "/avatar3.png", status: "New personal best: 30km in 1 hour!" },
  { id: 4, name: "David Brown", avatar: "/avatar4.png", status: "Exploring new trails in Leigh Woods" },
]

const groups = [
  { id: 1, name: "Weekend Warriors", members: 45, description: "For those who love weekend rides" },
  { id: 2, name: "City Explorers", members: 30, description: "Discover hidden gems in Bristol" },
  { id: 3, name: "Night Owls", members: 20, description: "Evening and night rides around the city" },
]

export default function CommunityPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Community</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{group.name}</h3>
                    <Button variant="outline" size="sm">
                      Join
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <p className="text-sm">{group.members} members</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

