import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

export default function LeaderboardPage() {
  const weeklyLeaders = [
    { id: 1, name: "Emma Williams", distance: "78.3 km", rides: 5, image: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "David Thompson", distance: "65.1 km", rides: 4, image: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Sarah Johnson", distance: "52.7 km", rides: 3, image: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Mike Peterson", distance: "48.2 km", rides: 3, image: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Lisa Anderson", distance: "42.9 km", rides: 2, image: "/placeholder.svg?height=40&width=40" },
  ]

  const monthlyLeaders = [
    { id: 1, name: "David Thompson", distance: "312.5 km", rides: 18, image: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Emma Williams", distance: "287.3 km", rides: 15, image: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Mike Peterson", distance: "243.8 km", rides: 12, image: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Sarah Johnson", distance: "198.2 km", rides: 10, image: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Lisa Anderson", distance: "176.4 km", rides: 9, image: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Weekly Leaders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyLeaders.map((leader, index) => (
                <div key={leader.id} className="flex items-center gap-3">
                  <div className="w-8 text-center font-bold">
                    {index === 0 ? (
                      <Trophy className="h-6 w-6 mx-auto text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal className="h-6 w-6 mx-auto text-gray-400" />
                    ) : index === 2 ? (
                      <Award className="h-6 w-6 mx-auto text-amber-700" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>
                  <img src={leader.image || "/placeholder.svg"} alt={leader.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.rides} rides</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{leader.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Monthly Leaders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyLeaders.map((leader, index) => (
                <div key={leader.id} className="flex items-center gap-3">
                  <div className="w-8 text-center font-bold">
                    {index === 0 ? (
                      <Trophy className="h-6 w-6 mx-auto text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal className="h-6 w-6 mx-auto text-gray-400" />
                    ) : index === 2 ? (
                      <Award className="h-6 w-6 mx-auto text-amber-700" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>
                  <img src={leader.image || "/placeholder.svg"} alt={leader.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.rides} rides</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{leader.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

