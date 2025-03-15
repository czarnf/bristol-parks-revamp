"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import WeatherWidget from "@/components/weather-widget"

export default function WeatherPage() {
  const [city, setCity] = useState("Bristol,uk")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCity(searchQuery)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cycling Weather</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Check Weather for Your Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Enter city name (e.g., London,uk)"
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            For best results, include the country code (e.g., Bristol,uk)
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <WeatherWidget city={city} className="md:col-span-2" />

        <Card>
          <CardHeader>
            <CardTitle>Cycling Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">☀️</span>
                <span>
                  <strong>Sunny:</strong> Apply sunscreen, wear sunglasses, and stay hydrated.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">🌧️</span>
                <span>
                  <strong>Rainy:</strong> Use fenders, wear waterproof clothing, and be cautious on wet surfaces.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">💨</span>
                <span>
                  <strong>Windy:</strong> Lower your riding position and be prepared for gusts, especially near
                  buildings.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">❄️</span>
                <span>
                  <strong>Cold:</strong> Dress in layers, protect extremities, and watch for ice patches.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">🔥</span>
                <span>
                  <strong>Hot:</strong> Ride during cooler hours, wear breathable clothing, and drink plenty of water.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Riding Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Based on typical Bristol weather patterns:</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Morning (6-9am)</span>
                <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                  Excellent
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Midday (11am-2pm)</span>
                <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full">
                  Good
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Afternoon (3-5pm)</span>
                <span className="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full">
                  Moderate
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Evening (6-8pm)</span>
                <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                  Excellent
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Morning and evening rides typically offer cooler temperatures and less traffic, making them ideal for
              cycling in Bristol.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

