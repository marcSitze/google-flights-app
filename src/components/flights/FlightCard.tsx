import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import type { FlightItinerary } from "@/types/flights"
import { formatTime, formatDuration } from "@/utils/dateUtils"

interface FlightCardProps {
  flight: FlightItinerary
  onSelect: (flightId: string) => void
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Flight Info */}
          <div className="flex-1 space-y-4">
            {flight.legs.map((leg, index) => (
              <div key={leg.id}>
                <div className="flex items-center space-x-4">
                  {/* Airline Logo */}
                  <div className="flex items-center space-x-2">
                    {/* <Image
                      src={leg.carriers.marketing[0].logoUrl || "/placeholder.svg"}
                      alt={leg.carriers.marketing[0].name}
                      width={24}
                      height={24}
                      className="rounded"
                    /> */}
                    <span className="text-sm text-gray-600 hidden sm:block">{leg.carriers.marketing[0].name}</span>
                  </div>

                  {/* Flight Times */}
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{formatTime(leg.departure)}</div>
                      <div className="text-sm text-gray-600">{leg.origin.displayCode}</div>
                    </div>

                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 border-t border-gray-300 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2">
                          <div className="text-xs text-gray-500 text-center">
                            {formatDuration(leg.durationInMinutes)}
                          </div>
                          {leg.stopCount > 0 && (
                            <div className="text-xs text-gray-500 text-center">
                              {leg.stopCount} stop{leg.stopCount > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-lg">{formatTime(leg.arrival)}</div>
                      <div className="text-sm text-gray-600">{leg.destination.displayCode}</div>
                      {leg.timeDeltaInDays > 0 && (
                        <div className="text-xs text-red-600">
                          +{leg.timeDeltaInDays} day{leg.timeDeltaInDays > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {index === 0 && flight.legs.length > 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>

          {/* Price and Book */}
          <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end space-y-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{flight.price.formatted}</div>
              <div className="text-sm text-gray-600">round trip</div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 justify-end">
              {flight.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag.replace("_", " ")}
                </Badge>
              ))}
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 mt-2" onClick={() => onSelect(flight.id)}>
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
