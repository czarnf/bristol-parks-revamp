"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, Bike, Users, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Map },
    { href: "/rides", label: "My Rides", icon: Bike },
    { href: "/community", label: "Community", icon: Users },
  ]

  return (
    <div className="mobile-nav">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={cn("mobile-nav-item", pathname === item.href && "active")}>
          <item.icon className="h-6 w-6" />
          <span>{item.label}</span>
        </Link>
      ))}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mobile-nav-item">
            <Menu className="h-6 w-6" />
            <span>More</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-[20px]">
          <div className="grid gap-4 py-4">
            <Link href="/stats" className="flex items-center p-2 rounded-md hover:bg-muted">
              Statistics
            </Link>
            <Link href="/achievements" className="flex items-center p-2 rounded-md hover:bg-muted">
              Achievements
            </Link>
            <Link href="/friends" className="flex items-center p-2 rounded-md hover:bg-muted">
              Friends
            </Link>
            <Link href="/groups" className="flex items-center p-2 rounded-md hover:bg-muted">
              Groups
            </Link>
            <Link href="/leaderboard" className="flex items-center p-2 rounded-md hover:bg-muted">
              Leaderboard
            </Link>
            <Link href="/upcoming" className="flex items-center p-2 rounded-md hover:bg-muted">
              Upcoming Rides
            </Link>
            <Link href="/progress" className="flex items-center p-2 rounded-md hover:bg-muted">
              Progress
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

