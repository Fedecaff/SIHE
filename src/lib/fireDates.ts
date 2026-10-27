const ARGENTINA = "America/Argentina/Buenos_Aires";

function formatArgentinaDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ARGENTINA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function todayInArgentina(now = new Date()): string {
  return formatArgentinaDate(now);
}

export function yesterdayInArgentina(now = new Date()): string {
  const today = todayInArgentina(now);
  return addCalendarDays(today, -1);
}

export function addCalendarDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return next.toISOString().slice(0, 10);
}

export function utcDateString(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function acqUtcMillis(acqDate: string, acqTime: string): number {
  const hhmm = acqTime.padStart(4, "0");
  return Date.parse(
    `${acqDate}T${hhmm.slice(0, 2)}:${hhmm.slice(2, 4)}:00Z`,
  );
}

export function formatAcqUtcToLocal(
  acqDate: string,
  acqTime: string,
): { utc: string; local: string } {
  const hhmm = acqTime.padStart(4, "0");
  const hh = hhmm.slice(0, 2);
  const mm = hhmm.slice(2, 4);
  const instant = new Date(`${acqDate}T${hh}:${mm}:00Z`);
  const local = new Intl.DateTimeFormat("es-AR", {
    timeZone: ARGENTINA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(instant);
  return {
    utc: `${acqDate} ${hh}:${mm} UTC`,
    local: `${local} (Argentina, UTC−3)`,
  };
}
