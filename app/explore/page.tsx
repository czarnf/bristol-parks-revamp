"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Info, Filter, List, MapIcon, Bike, Star, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

declare global {
  interface Window {
    google: any
  }
}

const center = { lat: 51.454514, lng: -2.58791 }

const mapContainerStyle = {
  width: "100%",
  height: "600px",
}

const parks = [
  {
    id: "1",
    name: "Ashton Court Estate",
    position: { lat: 51.4491, lng: -2.6453 },
    description: "Large estate with deer park and mountain biking trails.",
    rating: 4.8,
    reviews: 124,
    difficulty: "Moderate",
    features: ["Mountain biking", "Walking trails", "Café", "Parking"],
    image: "/parks/ashton-court.jpg",
  },
  {
    id: "2",
    name: "The Downs",
    position: { lat: 51.469, lng: -2.6253 },
    description: "Expansive parkland with walking and cycling paths.",
    rating: 4.6,
    reviews: 98,
    difficulty: "Easy",
    features: ["Cycling paths", "Open spaces", "Picnic areas"],
    image: "/parks/the-downs.jpg",
  },
  {
    id: "3",
    name: "Blaise Castle Estate",
    position: { lat: 51.4989, lng: -2.6346 },
    description: "Historic estate with castle, museum and nature trails.",
    rating: 4.7,
    reviews: 112,
    difficulty: "Moderate",
    features: ["Historic sites", "Nature trails", "Museum", "Playground"],
    image: "/parks/blaise-castle.jpg",
  },
  {
    id: "4",
    name: "Leigh Woods",
    position: { lat: 51.4646, lng: -2.6339 },
    description: "National Trust woodland with cycling and walking trails.",
    rating: 4.9,
    reviews: 156,
    difficulty: "Challenging",
    features: ["Mountain biking", "Walking trails", "Viewpoints"],
    image: "/parks/leigh-woods.jpg",
  },
  {
    id: "5",
    name: "Brandon Hill Nature Park",
    position: { lat: 51.4545, lng: -2.6066 },
    description: "City center park with Cabot Tower and great views.",
    rating: 4.5,
    reviews: 87,
    difficulty: "Easy",
    features: ["Viewpoints", "Historic tower", "Nature reserve"],
    image: "/parks/brandon-hill.jpg",
  },
]

export default function ExplorePage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedPark, setSelectedPark] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("map")
  const [filteredParks, setFilteredParks] = useState(parks)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const mapRef = useRef<google.maps.Map | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { toast } = useToast()

  // Filter parks based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = parks.filter(
        (park) =>
          park.name.toLowerCase().includes(query) ||
          park.description.toLowerCase().includes(query) ||
          park.features.some((feature) => feature.toLowerCase().includes(query)),
      )
      setFilteredParks(filtered)
    } else {
      setFilteredParks(parks)
    }
  }, [searchQuery])

  // Initialize geocoder, infowindow, and autocomplete when map is loaded
  useEffect(() => {
    if (isLoaded) {
      if (!geocoderRef.current) {
        geocoderRef.current = new window.google.maps.Geocoder()
      }

      if (!infoWindowRef.current) {
        infoWindowRef.current = new window.google.maps.InfoWindow()
      }

      if (searchInputRef.current && !autocompleteRef.current) {
        // Initialize the autocomplete with Bristol bias
        autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInputRef.current, {
          bounds: new window.google.maps.LatLngBounds(
            { lat: 51.4, lng: -2.7 }, // SW corner of Bristol
            { lat: 51.5, lng: -2.5 }, // NE corner of Bristol
          ),
          componentRestrictions: { country: "gb" },
          fields: ["address_components", "geometry", "name", "formatted_address"],
        })

        // Add listener for place selection
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()

          if (!place || !place.geometry || !place.geometry.location) {
            toast({
              title: "Place Not Found",
              description: "Please select a place from the dropdown",
              variant: "warning",
            })
            return
          }

          // Update map view
          if (mapRef.current) {
            if (place.geometry.viewport) {
              mapRef.current.fitBounds(place.geometry.viewport)
            } else {
              mapRef.current.setCenter(place.geometry.location)
              mapRef.current.setZoom(17)
            }

            // Find closest park
            let closestPark = null
            let closestDistance = Number.POSITIVE_INFINITY

            parks.forEach((park) => {
              const parkPos = park.position
              const placePos = place.geometry!.location
              const distance = Math.sqrt(
                Math.pow(parkPos.lat - placePos.lat(), 2) + Math.pow(parkPos.lng - placePos.lng(), 2),
              )

              if (distance < closestDistance) {
                closestDistance = distance
                closestPark = park
              }
            })

            if (closestPark) {
              setSelectedPark(closestPark)

              // Show info window with place details
              if (infoWindowRef.current) {
                infoWindowRef.current.setContent(`
                  <div style="padding: 8px; max-width: 200px;">
                    <strong>${place.name || place.formatted_address}</strong>
                    <p style="margin-top: 4px; font-size: 12px;">Nearest park: ${closestPark.name}</p>
                  </div>
                `)
                infoWindowRef.current.setPosition(place.geometry.location)
                infoWindowRef.current.open(mapRef.current)
              }

              toast({
                title: "Location Found",
                description: `Showing ${closestPark.name}, the closest park to your search`,
                variant: "success",
              })
            }
          }
        })
      }
    }
  }, [isLoaded, toast])

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
    const bounds = new window.google.maps.LatLngBounds(center)
    parks.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)

    // Set map options
    map.setOptions({
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [], // Ensure no custom styles are applied
    })

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (park: any) => {
    setSelectedPark(park)
    if (mapRef.current) {
      mapRef.current.panTo(park.position)
      mapRef.current.setZoom(15)
    }
  }

  const handleSearch = () => {
    if (!searchQuery || !geocoderRef.current || !mapRef.current) return

    setIsSearching(true)
    setSearchResults([])

    // Use Geocoder to find places when autocomplete is not used
    geocoderRef.current.geocode(
      {
        address: searchQuery + ", Bristol, UK",
        bounds: mapRef.current.getBounds() || undefined,
      },
      (results: any, status: any) => {
        if (status === "OK" && results && results.length > 0) {
          // Process results
          setSearchResults(results)

          const location = results[0].geometry.location
          const position = { lat: location.lat(), lng: location.lng() }

          // Update map view
          if (mapRef.current) {
            if (results[0].geometry.viewport) {
              mapRef.current.fitBounds(results[0].geometry.viewport)
            } else {
              mapRef.current.setCenter(position)
              mapRef.current.setZoom(15)
            }
          }

          // Find closest park
          let closestPark = null
          let closestDistance = Number.POSITIVE_INFINITY

          parks.forEach((park) => {
            const parkPos = park.position
            const distance = Math.sqrt(
              Math.pow(parkPos.lat - position.lat, 2) + Math.pow(parkPos.lng - position.lng, 2),
            )

            if (distance < closestDistance) {
              closestDistance = distance
              closestPark = park
            }
          })

          if (closestPark) {
            setSelectedPark(closestPark)

            // Show info window with place details
            if (infoWindowRef.current && mapRef.current) {
              infoWindowRef.current.setContent(`
                <div style="padding: 8px; max-width: 200px;">
                  <strong>${results[0].formatted_address}</strong>
                  <p style="margin-top: 4px; font-size: 12px;">Nearest park: ${closestPark.name}</p>
                </div>
              `)
              infoWindowRef.current.setPosition(position)
              infoWindowRef.current.open(mapRef.current)
            }

            toast({
              title: "Location Found",
              description: `Showing ${closestPark.name}, the closest park to your search`,
              variant: "success",
            })
          } else {
            toast({
              title: "Location Found",
              description: "No parks found near this location",
              variant: "info",
            })
          }
        } else {
          // Handle geocoding error
          toast({
            title: "Location Not Found",
            description: "Please try a different search term",
            variant: "warning",
          })

          if (infoWindowRef.current) {
            infoWindowRef.current.close()
          }
        }

        setIsSearching(false)
      },
    )
  }

  // Render loading state
  if (!isLoaded) {
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Explore Bristol's Green Spaces</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Find Parks and Cycling Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Skeleton className="h-[600px] w-full" />
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold text-primary mt-12 mb-6">Featured Parks and Gardens</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Render error state
  if (loadError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Map</h1>
        <p className="text-muted-foreground mb-6">We're having trouble loading the map. Please try again later.</p>
        <Alert variant="destructive" className="mb-6 max-w-2xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Google Maps API Error</AlertTitle>
          <AlertDescription>{loadError.message}</AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Explore Bristol's Green Spaces</h1>
          <p className="text-muted-foreground">Discover parks, cycling routes, and green areas around Bristol</p>
        </div>

        <div className="flex gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="map" className={activeTab === "map" ? "bg-primary text-primary-foreground" : ""}>
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
              <TabsTrigger value="list" className={activeTab === "list" ? "bg-primary text-primary-foreground" : ""}>
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" size="icon" className="rounded-md">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-primary" />
            Find Parks and Cycling Routes
          </CardTitle>
          <CardDescription>Search for parks, addresses, or landmarks in Bristol</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search for parks, addresses, or landmarks..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90" disabled={isSearching}>
              {isSearching ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Search for parks, addresses, landmarks, or areas in Bristol to find cycling destinations.
        </CardFooter>
      </Card>

      {activeTab === "map" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                styles: [], // Ensure no custom styles are applied
              }}
              mapContainerClassName="map-container"
            >
              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {filteredParks.map((park) => (
                      <Marker
                        key={park.id}
                        position={park.position}
                        onClick={() => handleMarkerClick(park)}
                        clusterer={clusterer}
                        icon={{
                          url: "/park-marker.png",
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        animation={window.google.maps.Animation.DROP}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>

              {selectedPark && (
                <InfoWindow
                  position={selectedPark.position}
                  onCloseClick={() => setSelectedPark(null)}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -40),
                  }}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-lg">{selectedPark.name}</h3>
                    <div className="flex items-center my-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(selectedPark.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm ml-1">{selectedPark.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({selectedPark.reviews} reviews)</span>
                    </div>
                    <p className="text-sm mb-3">{selectedPark.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {selectedPark.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {selectedPark.features.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          +{selectedPark.features.length - 3} more
                        </span>
                      )}
                    </div>
                    <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                      <Link href={`/parks/${selectedPark.id}`}>
                        <Info className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredParks.map((park) => (
            <Card key={park.id} className="overflow-hidden card-hover">
              <div className="relative h-48 w-full">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${park.image || "/placeholder.svg?height=200&width=400"})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{park.name}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(park.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white ml-1">{park.rating}</span>
                    <span className="text-xs text-white/70 ml-1">({park.reviews})</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {park.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Bristol
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{park.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {park.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {park.features.length > 3 && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">+{park.features.length - 3} more</span>
                  )}
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/parks/${park.id}`}>
                    <Bike className="h-4 w-4 mr-2" />
                    Explore Routes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredParks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No parks found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            We couldn't find any parks matching your search. Try different keywords or explore our featured parks.
          </p>
          <Button onClick={() => setSearchQuery("")}>Show All Parks</Button>
        </div>
      )}

      {filteredParks.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-primary mt-12 mb-6">Featured Parks and Gardens</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredParks.slice(0, 3).map((park) => (
              <Card
                key={park.id}
                className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{park.name}</h3>
                      <p className="text-muted-foreground mb-4">{park.description}</p>
                      <Button asChild size="sm" className="w-full bg-secondary hover:bg-secondary/90">
                        <Link href={`/parks/${park.id}`}>
                          <Info className="h-4 w-4 mr-2" />
                          Explore Routes
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

