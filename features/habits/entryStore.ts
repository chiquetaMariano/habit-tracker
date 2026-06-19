import type { HeatCellProps } from "../../components/charts/HeatCell";
import type { HeatWeekProps } from "../../components/charts/HeatWeek";

export type EntryStatus = "completed" | "not-completed";

export type HabitEntry = {
  date: string;
  status: EntryStatus;
  completions: number;
  note: string;
};

type EntryMap = Record<string, HabitEntry>;

const DEFAULT_WEEKS_COUNT = 53;

let entriesByDate: EntryMap = {};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function getDateKey(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function getEntryForDate(dateKey: string) {
  return entriesByDate[dateKey];
}

export function saveEntry(entry: HabitEntry) {
  entriesByDate = {
    ...entriesByDate,
    [entry.date]: entry,
  };
}

export function deleteEntry(dateKey: string) {
  const nextEntries = { ...entriesByDate };
  delete nextEntries[dateKey];
  entriesByDate = nextEntries;
}

function getCellValue(entry?: HabitEntry) {
  if (!entry || entry.status !== "completed" || entry.completions <= 0) {
    return { value: 0, level: 0 };
  }

  return {
    value: entry.completions,
    level: clamp(entry.completions, 1, 4),
  };
}

export function getHeatmapWeeks(weeksCount = DEFAULT_WEEKS_COUNT): HeatWeekProps[] {
  const today = new Date();
  const todayKey = getDateKey(today);
  const result: HeatWeekProps[] = [];

  const start = new Date(today);
  start.setDate(today.getDate() - (weeksCount - 1) * 7);

  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);

  for (let weekIndex = 0; weekIndex < weeksCount; weekIndex += 1) {
    const cells: HeatCellProps[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const cellDate = new Date(start);
      cellDate.setDate(start.getDate() + weekIndex * 7 + dayIndex);

      const dateKey = getDateKey(cellDate);
      const isFuture = dateKey > todayKey;
      const entry = isFuture ? undefined : getEntryForDate(dateKey);
      const { value, level } = isFuture ? { value: 0, level: 0 } : getCellValue(entry);

      cells.push({
        date: cellDate.toISOString(),
        value,
        level,
      });
    }

    result.push({ cells });
  }

  return result;
}
