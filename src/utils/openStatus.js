function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Works out whether `schedule` (see business.js) says we're open at `now`.
export function isOpenNow(schedule, now = new Date()) {
  const today = schedule.find((row) => row.day === now.getDay());
  if (!today) return false;

  const minutesNow = now.getHours() * 60 + now.getMinutes();
  return minutesNow >= toMinutes(today.open) && minutesNow < toMinutes(today.close);
}
