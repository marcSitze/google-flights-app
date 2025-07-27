import type { FlightItinerary, SortOption } from "@/types/flights"

/**
 * Calculates total duration for a flight itinerary
 */
export const calculateTotalDuration = (flight: FlightItinerary): number => {
  return flight.legs.reduce((sum, leg) => sum + leg.durationInMinutes, 0)
}

/**
 * Sorts flights based on the selected sort option
 */
export const sortFlights = (flights: FlightItinerary[], sortBy: SortOption): FlightItinerary[] => {
  const sorted = [...flights]

  switch (sortBy) {
    case "price":
      return sorted.sort((a, b) => a.price.raw - b.price.raw)
    case "duration":
      return sorted.sort((a, b) => calculateTotalDuration(a) - calculateTotalDuration(b))
    case "departure":
      return sorted.sort((a, b) => new Date(a.legs[0].departure).getTime() - new Date(b.legs[0].departure).getTime())
    default:
      return sorted.sort((a, b) => b.score - a.score)
  }
}

/**
 * Filters flights based on selected criteria
 */
export const filterFlights = (
  flights: FlightItinerary[],
  selectedStops: string[],
  selectedAirlines: string[],
  priceRange: [number, number],
): FlightItinerary[] => {
  return flights.filter((flight) => {
    // Filter by stops
    if (selectedStops.length > 0) {
      const hasDirectFlight = flight.legs.some((leg) => leg.stopCount === 0)
      const hasOneStop = flight.legs.some((leg) => leg.stopCount === 1)

      if (selectedStops.includes("direct") && !hasDirectFlight) return false
      if (selectedStops.includes("1-stop") && !hasOneStop) return false
    }

    // Filter by airlines
    if (selectedAirlines.length > 0) {
      const flightAirlines = flight.legs.flatMap((leg) => leg.carriers.marketing.map((carrier) => carrier.name))
      if (!selectedAirlines.some((airline) => flightAirlines.includes(airline))) return false
    }

    // Filter by price
    if (flight.price.raw < priceRange[0] || flight.price.raw > priceRange[1]) return false

    return true
  })
}
