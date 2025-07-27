"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Search, AlertCircle } from "lucide-react"
import { LocationSelector } from "./LocationSelector"
import type { SearchFormData, ValidationErrors } from "@/types/flights"
import { getTodayString } from "@/utils/dateUtils"

interface SearchFormProps {
  formData: SearchFormData
  errors: ValidationErrors
  isLoading: boolean
  onFormChange: (field: keyof SearchFormData, value: string) => void
  onSearch: () => void
}

export function SearchForm({ formData, errors, isLoading, onFormChange, onSearch }: SearchFormProps) {
  const today = getTodayString()

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <LocationSelector
            value={formData.origin}
            onChange={(value) => onFormChange("origin", value)}
            placeholder="Origin"
            label="From"
            error={errors.origin}
          />

          <LocationSelector
            value={formData.destination}
            onChange={(value) => onFormChange("destination", value)}
            placeholder="Destination"
            label="To"
            error={errors.destination}
          />

          <div>
            <Label htmlFor="depart" className="text-sm font-medium text-gray-700">
              Depart
            </Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
              <Input
                id="depart"
                type="date"
                value={formData.departDate}
                onChange={(e) => onFormChange("departDate", e.target.value)}
                min={today}
                className={`pl-10 ${errors.departDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.departDate && (
                <div className="absolute right-3 top-3">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.departDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.departDate}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="return" className="text-sm font-medium text-gray-700">
              Return
            </Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
              <Input
                id="return"
                type="date"
                value={formData.returnDate}
                onChange={(e) => onFormChange("returnDate", e.target.value)}
                min={formData.departDate || today}
                className={`pl-10 ${errors.returnDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.returnDate && (
                <div className="absolute right-3 top-3">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.returnDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.returnDate}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <Button
              onClick={onSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
        </div>
      </div>
    </div>
  )
}
