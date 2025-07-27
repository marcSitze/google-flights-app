import { useState, useCallback } from "react"
import type { SearchFormData, ValidationErrors } from "@/types/flights"
import { isDateInPast } from "@/utils/dateUtils"

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateForm = useCallback((formData: SearchFormData): boolean => {
    const newErrors: ValidationErrors = {}
    const departDateTime = new Date(formData.departDate)
    const returnDateTime = new Date(formData.returnDate)

    // Origin validation
    if (!formData.origin.trim()) {
      newErrors.origin = "Please select an origin"
    }

    // Destination validation
    if (!formData.destination.trim()) {
      newErrors.destination = "Please select a destination"
    } else if (
      formData.origin.trim() &&
      formData.destination.trim() &&
      formData.origin.toLowerCase() === formData.destination.toLowerCase()
    ) {
      newErrors.destination = "Destination must be different from origin"
    }

    // Departure date validation
    if (!formData.departDate) {
      newErrors.departDate = "Please select a departure date"
    } else if (isDateInPast(formData.departDate)) {
      newErrors.departDate = "Departure date cannot be in the past"
    }

    // Return date validation
    if (!formData.returnDate) {
      newErrors.returnDate = "Please select a return date"
    } else if (isDateInPast(formData.returnDate)) {
      newErrors.returnDate = "Return date cannot be in the past"
    } else if (formData.departDate && returnDateTime <= departDateTime) {
      newErrors.returnDate = "Return date must be after departure date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  const clearFieldError = useCallback((field: keyof ValidationErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    errors,
    validateForm,
    clearFieldError,
    clearAllErrors,
  }
}
