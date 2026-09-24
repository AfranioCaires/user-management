const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate))
}
