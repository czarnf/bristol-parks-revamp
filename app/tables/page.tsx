import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function Tables() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Bristol Cycling Routes</h2>

        <Card>
          <CardContent className="p-6">
            <div className="relative w-full h-[600px]">
              <Image
                src="/tables/Screenshot 2023-11-16 152014.png"
                alt="Table of Bristol cycling routes"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

