/**
 * Calendar utilities to generate Google Calendar links and .ics file downloads
 * for the Friday 8:00 PM dinner date at Sandeep.
 */

export function getUpcomingFriday8PM(): { startDate: Date; endDate: Date } {
  const now = new Date();
  const result = new Date(now);
  
  // Day of week: 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  const currentDay = now.getDay();
  let daysUntilFriday = (5 - currentDay + 7) % 7;
  
  // If today is Friday and it's already past 8:00 PM, jump to next Friday
  if (daysUntilFriday === 0 && now.getHours() >= 20) {
    daysUntilFriday = 7;
  }

  result.setDate(now.getDate() + daysUntilFriday);
  result.setHours(20, 0, 0, 0); // 8:00 PM

  const endDate = new Date(result);
  endDate.setHours(22, 30, 0, 0); // 10:30 PM (2.5 hr dinner)

  return { startDate: result, endDate };
}

function formatDateToGoogleISO(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

export function generateGoogleCalendarUrl(): string {
  const { startDate, endDate } = getUpcomingFriday8PM();
  const startStr = formatDateToGoogleISO(startDate);
  const endStr = formatDateToGoogleISO(endDate);

  const title = encodeURIComponent('🦇 Dinner Date @ Sandeep (with Siddhant Shetty)');
  const details = encodeURIComponent(
    'Wayne Enterprises Classified Dinner Rendezvous.\n\nOperative: Siddhant Shetty\nLocation: Sandeep\nTime: Friday @ 8:00 PM\nDirective: Excellent food, Gotham vibes, and great company.\n\n"It\'s not who I am underneath, but what I do that defines me."'
  );
  const location = encodeURIComponent('Sandeep');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const { startDate, endDate } = getUpcomingFriday8PM();
  const startStr = formatDateToGoogleISO(startDate);
  const endStr = formatDateToGoogleISO(endDate);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wayne Enterprises//Gotham Dispatch//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    'SUMMARY:🦇 Dinner Date @ Sandeep (with Siddhant Shetty)',
    'DESCRIPTION:Classified Dinner Rendezvous with Siddhant Shetty at Sandeep on Friday at 8:00 PM.',
    'LOCATION:Sandeep',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'batman-dinner-date-sandeep.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
