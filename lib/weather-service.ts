type WeatherData = {
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  name: string
  dt: number
  sys: {
    sunrise: number
    sunset: number
  }
}

type ForecastData = {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
    }
    dt_txt: string
  }>
}

export async function getCurrentWeather(city = "Bristol,uk"): Promise<WeatherData> {
  const apiKey = "99b0d9f90943ad36b4530bfadb3922df"
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    { next: { revalidate: 1800 } }, // Revalidate every 30 minutes
  )

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }

  return response.json()
}

export async function getWeatherForecast(city = "Bristol,uk"): Promise<ForecastData> {
  const apiKey = "99b0d9f90943ad36b4530bfadb3922df"
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
    { next: { revalidate: 1800 } }, // Revalidate every 30 minutes
  )

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data")
  }

  return response.json()
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

