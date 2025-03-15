"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Save, Clock, MapPin, TrendingUp, Bike, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    google: any
  }
}

export default function RidePage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isRiding, setIsRiding] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const userMarkerRef = useRef<google.maps.Marker | null>(null)
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!mapRef.current || map) return

    const initialMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 51.4545, lng: -2.5879 }, // Bristol coordinates
      zoom: 14,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [], // Ensure no custom styles are applied
    })

    setMap(initialMap)

    // Add user location marker
    userMarkerRef.current = new window.google.maps.Marker({
      position: { lat: 51.4545, lng: -2.5879 },
      map: initialMap,
      title: "Your Location",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
    })

    // Initialize directions service and renderer
    directionsServiceRef.current = new window.google.maps.DirectionsService()
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: initialMap,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.7,
      },
    })

    // Try to get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          userMarkerRef.current?.setPosition(pos)
          initialMap.setCenter(pos)
        },
        () => {
          console.log("Error: The Geolocation service failed.")
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Using default Bristol location.",
            variant: "warning",
          })
        },
      )
    }

    // Initialize autocomplete for route search
    if (searchInputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        bounds: new window.google.maps.LatLngBounds(
          { lat: 51.4, lng: -2.7 }, // SW corner of Bristol
          { lat: 51.5, lng: -2.5 }, // NE corner of Bristol
        ),
        componentRestrictions: { country: "gb" },
        fields: ["geometry", "name", "formatted_address"],
      })

      // Add listener for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace()

        if (!place || !place.geometry || !place.geometry.location) {
          toast({
            title: "Route Not Found",
            description: "Please select a destination from the dropdown",
            variant: "warning",
          })
          return
        }

        // Calculate route if we have user position and destination
        if (userMarkerRef.current && directionsServiceRef.current && directionsRendererRef.current) {
          const origin = userMarkerRef.current.getPosition()
          const destination = place.geometry.location

          if (origin) {
            directionsServiceRef.current.route(
              {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.BICYCLING,
              },
              (result, status) => {
                if (status === "OK" && result) {
                  directionsRendererRef.current?.setDirections(result)

                  // Calculate approximate distance
                  let routeDistance = 0
                  result.routes[0].legs.forEach((leg) => {
                    routeDistance += leg.distance?.value || 0
                  })

                  // Convert to kilometers
                  routeDistance = routeDistance / 1000

                  toast({
                    title: "Route Calculated",
                    description: `Distance: ${routeDistance.toFixed(1)} km`,
                    variant: "success",
                  })
                } else {
                  toast({
                    title: "Route Error",
                    description: "Could not calculate a cycling route to this destination",
                    variant: "warning",
                  })
                }
              },
            )
          }
        }
      })
    }
  }, [map, toast])

  useEffect(() => {
    if (isRiding) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
        // Simulate distance increase (in a real app, this would use GPS data)
        setDistance((prev) => prev + Math.random() * 0.01)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRiding])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setIsRiding(!isRiding)
  }

  const handleReset = () => {
    setIsRiding(false)
    setElapsedTime(0)
    setDistance(0)
  }

  const handleSave = () => {
    toast({
      title: "Ride Saved",
      description: "Your ride has been saved successfully!",
      variant: "success",
    })
    handleReset()
  }

  const handleLoadRoute = (routeName: string, routeDistance: string) => {
    // In a real app, this would load predefined route data
    toast({
      title: "Route Loaded",
      description: `${routeName} (${routeDistance}) has been loaded`,
      variant: "success",
    })

    // For demo purposes, we'll just simulate loading a route
    if (map && directionsRendererRef.current && userMarkerRef.current) {
      const userPos = userMarkerRef.current.getPosition()

      if (!userPos) return

      // Create a simulated route based on the route name
      let destination

      switch (routeName) {
        case "Ashton Court Loop":
          destination = { lat: 51.4491, lng: -2.6453 }
          break
        case "Bristol Harbour Circuit":
          destination = { lat: 51.4479, lng: -2.5976 }
          break
        case "Leigh Woods Trail":
          destination = { lat: 51.4646, lng: -2.6339 }
          break
        default:
          destination = { lat: 51.4545, lng: -2.5879 }
      }

      directionsServiceRef.current?.route(
        {
          origin: userPos,
          destination,
          travelMode: window.google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            directionsRendererRef.current?.setDirections(result)
          }
        },
      )
    }
  }

  const handleMapStyleChange = (style: string) => {
    if (!map) return

    switch (style) {
      case "Satellite":
        map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
        break
      case "Terrain":
        map.setMapTypeId(window.google.maps.MapTypeId.TERRAIN)
        break
      default:
        map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)
    }

    toast({
      title: "Map Style Changed",
      description: `Map style set to ${style}`,
      variant: "info",
    })
  }

  const handleCenterMap = () => {
    if (map && userMarkerRef.current) {
      const pos = userMarkerRef.current.getPosition()
      if (pos) {
        map.setCenter(pos)
        map.setZoom(15)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 pt-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Start a Ride</h2>
            <p className="text-muted-foreground">Track your cycling activity in real-time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-16rem)]">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Live Map</CardTitle>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          Map Style
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleMapStyleChange("Standard")}>Standard</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMapStyleChange("Satellite")}>Satellite</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMapStyleChange("Terrain")}>Terrain</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={handleCenterMap}>
                      Center
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[calc(100vh-20rem)]">
                  <div ref={mapRef} className="map-container h-full w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ride Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-2xl font-bold">{formatTime(elapsedTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Speed</p>
                      <p className="text-2xl font-bold">
                        {elapsedTime > 0 ? (distance / (elapsedTime / 3600)).toFixed(1) : "0.0"} km/h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Bike className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="text-2xl font-bold">{Math.floor(distance * 40)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <Button onClick={handleStartPause} className="gap-2" variant={isRiding ? "destructive" : "default"}>
                    {isRiding ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Pause Ride
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Ride
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleReset} disabled={elapsedTime === 0} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>

                    <Button variant="outline" onClick={handleSave} disabled={elapsedTime === 0} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search routes or destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        name: "Ashton Court Loop",
                        distance: "5.2 km",
                      },
                      {
                        name: "Bristol Harbour Circuit",
                        distance: "4.8 km",
                      },
                      {
                        name: "Leigh Woods Trail",
                        distance: "7.3 km",
                      },
                    ].map((route, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => handleLoadRoute(route.name, route.distance)}
                      >
                        <div>
                          <p className="text-sm font-medium">{route.name}</p>
                          <p className="text-xs text-muted-foreground">{route.distance}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Load
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

