import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bike, MapPin, Users, BarChart, Sun, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import WeatherWidget from "@/components/weather-widget"

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-60"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="animate-fade-in mb-4 text-5xl font-bold tracking-tight text-primary md:text-6xl">
                Discover Bristol's <br />
                <span className="text-accent">Cycling Paradise</span>
              </h1>
              <p className="animate-fade-in mb-8 text-xl text-muted-foreground [animation-delay:200ms]">
                Explore green spaces, find the perfect routes, and connect with fellow cyclists in Bristol.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
                <Link href="/explore">
                  <Button
                    size="lg"
                    className="adventure-button w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-6 px-10 rounded-full shadow-lg relative overflow-hidden border-2 border-accent/50 sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center">
                      Start Your Adventure
                      <Bike className="ml-3 h-6 w-6 animate-wheel" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent overflow-hidden">
                      <span className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 bg-accent/30 rounded-full animate-cycle"></span>
                    </span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary/50 hover:bg-primary/10 sm:w-auto"
                >
                  How It Works
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-11-30%20193556-Ej4Xe2uoZGr4cx4hq3PTkwogzrUl6v.png"
                  alt="Aerial view of Clifton Suspension Bridge and Bristol"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary p-2">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                  <span className="text-center text-sm font-bold">20+ Parks</span>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent p-2">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                  <span className="text-center text-sm font-bold">100+ Routes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                <Bike className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">287.5 km</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Parks Visited</CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">+2 new this month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rides</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <BarChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 new unlocked</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Bristol Bike Buddy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to make the most of cycling in Bristol's beautiful green spaces.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discover Parks & Routes</h3>
                <p className="text-muted-foreground mb-4">
                  Explore Bristol's green spaces with detailed maps, routes, and information.
                </p>
                <Link href="/explore" className="text-primary hover:underline inline-flex items-center">
                  Explore Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Bike className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Rides</h3>
                <p className="text-muted-foreground mb-4">
                  Record your cycling journeys, track statistics, and set personal goals.
                </p>
                <Link href="/rides" className="text-secondary hover:underline inline-flex items-center">
                  Start Tracking <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with fellow cyclists, join group rides, and share your experiences.
                </p>
                <Link href="/community" className="text-accent hover:underline inline-flex items-center">
                  Get Involved <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">Weekend Group Ride</h4>
                      <p className="text-sm text-muted-foreground">Ashton Court Estate</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">Sat, 10:00 AM</span>
                      <p className="text-xs text-muted-foreground">12 participants</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">Bike Maintenance Workshop</h4>
                      <p className="text-sm text-muted-foreground">Bristol Bike Hub</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">Wed, 6:00 PM</span>
                      <p className="text-xs text-muted-foreground">8 spots left</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Family Friendly Ride</h4>
                      <p className="text-sm text-muted-foreground">The Downs</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">Sun, 11:00 AM</span>
                      <p className="text-xs text-muted-foreground">All welcome</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm card-hover transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-primary" />
                  Today's Riding Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WeatherWidget />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready for your next adventure?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of cyclists exploring Bristol's beautiful parks and green spaces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href="/explore">
                Discover New Routes
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/community">
                Join Our Community
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

