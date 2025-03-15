"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Droplets } from "lucide-react"
import { getCurrentWeather, getWeatherForecast, formatTemperature, getWindDirection } from "@/lib/weather-service"

type WeatherWidgetProps = {
  city?: string
  className?: string
}

export default function WeatherWidget({ city = "Bristol,uk", className }: WeatherWidgetProps) {
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true)
        const [weatherData, forecastData] = await Promise.all([getCurrentWeather(city), getWeatherForecast(city)])

        setCurrentWeather(weatherData)

        // Process forecast data to get next few hours
        const hourlyForecast = forecastData.list.slice(0, 5)
        setForecast(hourlyForecast)

        setError(null)
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError("Failed to load weather data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [city])

  function getWeatherIcon(condition: string) {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-10 w-10 text-yellow-400" />
      case "clouds":
        return <Cloud className="h-10 w-10 text-blue-300" />
      case "rain":
      case "drizzle":
        return <CloudRain className="h-10 w-10 text-blue-400" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-blue-100" />
      case "thunderstorm":
        return <CloudLightning className="h-10 w-10 text-purple-400" />
      case "mist":
      case "fog":
        return <CloudFog className="h-10 w-10 text-gray-400" />
      default:
        return <Sun className="h-10 w-10 text-yellow-400" />
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Sun className="h-5 w-5 mr-2 text-primary" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Sun className="h-5 w-5 mr-2 text-primary" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Cloud className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentWeather) return null

  const weatherCondition = currentWeather.weather[0].main
  const weatherDescription = currentWeather.weather[0].description
  const temperature = currentWeather.main.temp
  const feelsLike = currentWeather.main.feels_like
  const windSpeed = currentWeather.wind.speed
  const windDirection = getWindDirection(currentWeather.wind.deg)
  const humidity = currentWeather.main.humidity

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Sun className="h-5 w-5 mr-2 text-primary" />
          Cycling Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {getWeatherIcon(weatherCondition)}
            <div className="ml-4">
              <div className="text-3xl font-bold">{formatTemperature(temperature)}</div>
              <div className="text-sm text-muted-foreground">Feels like {formatTemperature(feelsLike)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium capitalize">{weatherDescription}</div>
            <div className="flex items-center justify-end mt-1 text-sm text-muted-foreground">
              <Wind className="h-4 w-4 mr-1" />
              <span>
                {windSpeed} m/s {windDirection}
              </span>
            </div>
            <div className="flex items-center justify-end mt-1 text-sm text-muted-foreground">
              <Droplets className="h-4 w-4 mr-1" />
              <span>{humidity}% humidity</span>
            </div>
          </div>
        </div>

        {forecast && (
          <div>
            <h4 className="text-sm font-medium mb-2">Forecast</h4>
            <div className="grid grid-cols-5 gap-2">
              {forecast.map((item: any, index: number) => {
                const time = new Date(item.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                return (
                  <div key={index} className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                    <span className="text-xs">{time}</span>
                    <img
                      src={getWeatherIcon(item.weather[0].icon) || "/placeholder.svg"}
                      alt={item.weather[0].description}
                      className="h-8 w-8 my-1"
                    />
                    <span className="text-sm font-medium">{formatTemperature(item.main.temp)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-4 text-sm">
          <p className="text-muted-foreground">{getRidingConditionMessage(weatherCondition, temperature, windSpeed)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function getRidingConditionMessage(condition: string, temp: number, windSpeed: number): string {
  if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
    return "Wet conditions - consider waterproof gear and be cautious on slippery surfaces."
  }

  if (condition === "Snow" || condition === "Sleet") {
    return "Icy conditions - riding not recommended unless you have appropriate winter tires."
  }

  if (windSpeed > 10) {
    return "Strong winds - be careful on exposed routes and watch for crosswinds."
  }

  if (temp > 28) {
    return "Hot conditions - stay hydrated and consider riding during cooler parts of the day."
  }

  if (temp < 5) {
    return "Cold conditions - dress in layers and protect extremities."
  }

  return "Good riding conditions - enjoy your cycle!"
}

