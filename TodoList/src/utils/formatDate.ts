export function formatDate(date: Date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone:'UTC'
  });
  
  return formatter.format(date).replace(',', '');
}