// Service to handle Google Calendar Export Links and integrations
export const generateGoogleCalendarLink = (event) => {
  if (!event) return '';
  
  // Format event date (YYYY-MM-DD) and time (e.g. "09:00 AM" or "05:00 PM")
  // into Google Calendar ISO format: YYYYMMDDTHHMMSSZ
  const formatDateForGoogle = (dateStr, timeStr) => {
    try {
      const date = new Date(dateStr);
      let [hours, minutes] = timeStr.replace(/[AM|PM]/g, '').trim().split(':');
      hours = parseInt(hours);
      
      if (timeStr.includes('PM') && hours < 12) hours += 12;
      if (timeStr.includes('AM') && hours === 12) hours = 0;
      
      date.setHours(hours, parseInt(minutes), 0);
      
      // format to string: YYYYMMDDTHHMMSSZ
      const pad = (n) => String(n).padStart(2, '0');
      const yyyy = date.getUTCFullYear();
      const mm = pad(date.getUTCMonth() + 1);
      const dd = pad(date.getUTCDate());
      const hh = pad(date.getUTCHours());
      const min = pad(date.getUTCMinutes());
      const ss = pad(date.getUTCSeconds());
      
      return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
    } catch (e) {
      console.error("Error formatting date for Google Calendar", e);
      return '';
    }
  };

  const startFormatted = formatDateForGoogle(event.date, event.time);
  
  // Estimate end time + 2 hours
  const formatEndDate = (dateStr, timeStr) => {
    try {
      const date = new Date(dateStr);
      let [hours, minutes] = timeStr.replace(/[AM|PM]/g, '').trim().split(':');
      hours = parseInt(hours) + 2; // add 2 hours
      
      if (timeStr.includes('PM') && hours < 12) hours += 12;
      if (timeStr.includes('AM') && hours === 12) hours = 0;
      
      date.setHours(hours, parseInt(minutes), 0);
      
      const pad = (n) => String(n).padStart(2, '0');
      const yyyy = date.getUTCFullYear();
      const mm = pad(date.getUTCMonth() + 1);
      const dd = pad(date.getUTCDate());
      const hh = pad(date.getUTCHours());
      const min = pad(date.getUTCMinutes());
      const ss = pad(date.getUTCSeconds());
      
      return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
    } catch (e) {
      return '';
    }
  };
  
  const endFormatted = formatEndDate(event.date, event.time);
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(`${event.description}\n\nOrganizer: ${event.organizer}`);
  const location = encodeURIComponent(event.venue);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}&sf=true&output=xml`;
};

export const exportToCalendar = (event) => {
  const url = generateGoogleCalendarLink(event);
  if (url) {
    window.open(url, '_blank');
  }
};
