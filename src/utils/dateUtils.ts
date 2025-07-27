/**
 * Formats a date string to display time in HH:MM format
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

/**
 * Formats duration in minutes to human-readable format (e.g., "8h 15m")
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

/**
 * Formats a date string to display date in readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

/**
 * Gets today's date in YYYY-MM-DD format for HTML date inputs
 */
export const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0]
}

/**
 * Checks if a date is in the past
 */
export const isDateInPast = (dateString: string): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const inputDate = new Date(dateString)
  return inputDate < today
}
