import { describe, expect, it } from "vitest";
import {
  acqUtcMillis,
  addCalendarDays,
  formatAcqUtcToLocal,
  yesterdayInArgentina,
} from "@/lib/fireDates";

describe("fechas de fuego satelital", () => {
  it("ayer en Argentina es el día calendario anterior", () => {
    const now = new Date("2026-10-11T02:30:00Z");
    expect(yesterdayInArgentina(now)).toBe("2026-10-09");
  });

  it("suma días de calendario sin depender de la hora local", () => {
    expect(addCalendarDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("muestra la adquisición en UTC y en hora de Argentina", () => {
    const formatted = formatAcqUtcToLocal("2026-10-10", "1530");
    expect(formatted.utc).toBe("2026-10-10 15:30 UTC");
    expect(formatted.local).toContain("12:30");
    expect(formatted.local).toContain("UTC−3");
    expect(acqUtcMillis("2026-10-10", "1530")).toBe(
      Date.parse("2026-10-10T15:30:00Z"),
    );
  });
});
