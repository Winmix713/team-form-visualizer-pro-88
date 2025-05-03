
/**
 * Formats a date string into a short month-day format
 * Handles invalid dates gracefully by returning the original string
 */
export const formatShortDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if it's a valid date
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    return new Intl.DateTimeFormat('hu-HU', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Return original on error
  }
};
