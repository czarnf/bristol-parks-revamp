import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Bike, MapPin, Zap } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "Century Rider",
    description: "Ride 100km in a single trip",
    progress: 75,
    icon: Bike,
    completed: false,
  },
  {
    id: 2,
    name: "Explorer",
    description: "Visit 10 different parks",
    progress: 100,
    icon: MapPin,
    completed: true,
  },
  {
    id: 3,
    name: "Speed Demon",
    description: "Achieve an average speed of 25km/h",
    progress: 60,
    icon: Zap,
    completed: false,
  },
  {
    id: 4,
    name: "Early Bird",
    description: "Complete 5 rides before 7 AM",
    progress: 40,
    icon: Award,
    completed: false,
  },
]

export default function AchievementsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Achievements</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{achievement.name}</CardTitle>
              <achievement.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">{achievement.description}</div>
              <Progress value={achievement.progress} className="mt-2" />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">{achievement.progress}% complete</span>
                {achievement.completed && <Badge variant="secondary">Completed</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

