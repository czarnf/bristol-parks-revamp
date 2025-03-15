import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Map, Award } from "lucide-react"

export default function ProgressPage() {
  const monthlyProgress = [
    { month: "January", distance: 87, rides: 6 },
    { month: "February", distance: 124, rides: 9 },
    { month: "March", distance: 156, rides: 12 },
  ]

  const goals = [
    {
      id: 1,
      title: "Ride 500km in 2024",
      current: 367,
      target: 500,
      unit: "km",
      icon: Map,
      deadline: "December 31, 2024",
    },
    {
      id: 2,
      title: "Complete 100 rides",
      current: 27,
      target: 100,
      unit: "rides",
      icon: Calendar,
      deadline: "December 31, 2024",
    },
    {
      id: 3,
      title: "Visit all Bristol parks",
      current: 12,
      target: 20,
      unit: "parks",
      icon: Award,
      deadline: "June 30, 2024",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-16 w-16 mx-auto mb-2" />
                <p>Monthly progress chart will appear here</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {monthlyProgress.map((month) => (
                <div key={month.month} className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">{month.month}</p>
                  <p className="text-2xl font-bold">{month.distance} km</p>
                  <p className="text-sm text-muted-foreground">{month.rides} rides</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Distance</p>
                <p className="text-4xl font-bold">367 km</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-4xl font-bold">27</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Parks Visited</p>
                <p className="text-4xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary text-primary-foreground">
                  <goal.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-xs text-muted-foreground">Deadline: {goal.deadline}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {goal.current} {goal.unit}
                  </span>
                  <span>
                    {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-muted-foreground">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

