import { FlightResults } from "@/components/flights/flightResults"
import { SearchForm } from "@/components/search/SearchForm"
import { useFlightSearch } from "@/hooks/useFlightSearch"
import { useFormValidation } from "@/hooks/useFormValidation"
import type { SearchFormData } from "@/types/flights"
import { Plane } from "lucide-react"
import { useCallback, useState } from "react"

// Initial form data
const initialFormData: SearchFormData = {
  origin: "London",
  destination: "New York",
  departDate: "2025-07-28",
  returnDate: "2025-07-30",
}

export default function GoogleFlights() {
  // Form state
  const [formData, setFormData] = useState<SearchFormData>(initialFormData)

  // Custom hooks
  const { errors, validateForm, clearFieldError } = useFormValidation()
  const { flights, isLoading, hasSearched, searchFlights } = useFlightSearch()

  // Handlers
  const handleFormChange = useCallback(
    (field: keyof SearchFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      clearFieldError(field)

      // Clear destination error if origin changes and they're no longer the same
      if (field === "origin" && errors.destination && value.toLowerCase() !== formData.destination.toLowerCase()) {
        clearFieldError("destination")
      }
      if (field === "destination" && errors.destination && value.toLowerCase() !== formData.origin.toLowerCase()) {
        clearFieldError("destination")
      }
    },
    [clearFieldError, errors.destination, formData.destination, formData.origin],
  )

  const handleSearch = useCallback(async () => {
    if (validateForm(formData)) {
      await searchFlights(formData)
    }
  }, [formData, validateForm, searchFlights])

  const handleFlightSelect = useCallback((flightId: string) => {
    console.log("Selected flight:", flightId)
    // Handle flight selection logic here
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">Flights</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Form */}
      <SearchForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onFormChange={handleFormChange}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Results */}
          <div className="flex-1">
            <FlightResults
              flights={flights}
              isLoading={isLoading}
              hasSearched={hasSearched}
              onFlightSelect={handleFlightSelect}
            />
          </div>
        </div>
      </main>
    </div>
  )
}