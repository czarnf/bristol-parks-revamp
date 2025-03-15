"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Bike, Users, BarChart, Calendar, Award, MessageSquare, Cloud } from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart,
    href: "/",
  },
  {
    label: "Explore",
    icon: MapPin,
    href: "/explore",
  },
  {
    label: "My Rides",
    icon: Bike,
    href: "/rides",
  },
  {
    label: "Community",
    icon: Users,
    href: "/community",
  },
  {
    label: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    label: "Achievements",
    icon: Award,
    href: "/achievements",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    label: "Weather",
    icon: Cloud,
    href: "/weather",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary/30 text-secondary-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Bristol Parks & Gardens</h1>
        </Link>
        <ScrollArea className="flex-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href && "bg-secondary/50")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

