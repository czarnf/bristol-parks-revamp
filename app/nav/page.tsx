"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search for routes or parks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="relative w-full h-[500px] mb-6 rounded-lg overflow-hidden border">
          <Image
            src="/nav/leisure rides .png"
            alt="Map of Bristol cycling routes"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div className="flex justify-center">
          <Link href="/tables">
            <Button variant="outline" size="lg">
              View Routes Table
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

