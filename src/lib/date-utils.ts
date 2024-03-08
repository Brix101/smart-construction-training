import { format, isAfter, subWeeks } from "date-fns"

export function formatSignInDate(lastSignInTimestamp?: number | null) {
  if (!lastSignInTimestamp) return ""

  // Convert the timestamp to a Date object
  const lastSignInDate = new Date(lastSignInTimestamp)
  const currentDate = new Date()

  // Check if the last sign-in is over a week old
  const isNotOverAWeek = isAfter(lastSignInDate, subWeeks(currentDate, 1))

  // Format the date accordingly
  let formattedDate

  if (isNotOverAWeek) {
    formattedDate = "Last " + format(lastSignInDate, "eeee 'at' h:mm a")
  } else {
    formattedDate = format(lastSignInDate, "MM/dd/yyyy")
  }

  return formattedDate
}
