import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, MessageSquare, X } from "lucide-react"

export default function FriendsPage() {
  const friends = [
    {
      id: 1,
      name: "Sarah Johnson",
      status: "Online",
      lastRide: "2 days ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mike Peterson",
      status: "Offline",
      lastRide: "1 week ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: 3, name: "Emma Williams", status: "Online", lastRide: "Today", image: "/placeholder.svg?height=40&width=40" },
    {
      id: 4,
      name: "David Thompson",
      status: "Offline",
      lastRide: "3 days ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      status: "Online",
      lastRide: "Yesterday",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const friendRequests = [
    { id: 1, name: "James Wilson", mutualFriends: 3, image: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Olivia Davis", mutualFriends: 1, image: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Friends</CardTitle>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={friend.image || "/placeholder.svg"}
                          alt={friend.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            friend.status === "Online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                      </div>
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">Last ride: {friend.lastRide}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Friend Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {friendRequests.length > 0 ? (
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={request.image || "/placeholder.svg"}
                          alt={request.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-xs text-muted-foreground">{request.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-6">No pending friend requests</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

