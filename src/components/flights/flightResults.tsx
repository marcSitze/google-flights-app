import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import type { FlightItinerary } from "@/types/flights"
import { Plane } from "lucide-react"
import { FlightCard } from "./FlightCard"

interface FlightResultsProps {
  flights: FlightItinerary[]
  isLoading: boolean
  hasSearched: boolean
  onFlightSelect: (flightId: string) => void
}

export function FlightResults({
  flights,
  isLoading,
  hasSearched,
  onFlightSelect,
}: FlightResultsProps) {

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Searching for flights...</span>
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-12">
        <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to search</h3>
        <p className="text-gray-600">Enter your travel details above and click search to find flights.</p>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <>
      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} onSelect={onFlightSelect} />
        ))}
      </div>
    </>
  )
}
