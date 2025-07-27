import { useState, useCallback } from "react";
import type { FlightItinerary, SearchFormData } from "@/types/flights";
import { mockFlights } from "@/mock/flights";

interface UseFlightSearchReturn {
  flights: FlightItinerary[];
  isLoading: boolean;
  hasSearched: boolean;
  searchFlights: (formData: SearchFormData) => Promise<void>;
  resetSearch: () => void;
}

export const useFlightSearch = (): UseFlightSearchReturn => {
  const [flights, setFlights] = useState<FlightItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchFlights = useCallback(async (formData: SearchFormData) => {
    console.log({ formData });
    setIsLoading(true);
    setHasSearched(false);

    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // In a real app, this would be an API call
      setFlights(mockFlights);
      setHasSearched(true);
    } catch (error) {
      console.error("Flight search failed:", error);
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setFlights([]);
    setIsLoading(false);
    setHasSearched(false);
  }, []);

  return {
    flights,
    isLoading,
    hasSearched,
    searchFlights,
    resetSearch,
  };
};
