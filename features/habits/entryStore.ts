import type { HeatCellProps } from "../../components/charts/HeatCell";
import type { HeatWeekProps } from "../../components/charts/HeatWeek";
import {
  deleteEntry as deletePersistedEntry,
  getEntriesInRange,
  getEntryForDate as getPersistedEntryForDate,
  initializeEntryDatabase,
  upsertEntry,
} from "./entryRepository";

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
let selectedDateKey: string | null = null;

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

export function getSelectedDateKey() {
  return selectedDateKey;
}

export function setSelectedDateKey(dateKey: string) {
  selectedDateKey = dateKey;
}

export function clearSelectedDateKey() {
  selectedDateKey = null;
}

export function getSelectedEntry() {
  if (!selectedDateKey) {
    return undefined;
  }

  return getEntryForDate(selectedDateKey);
}

export async function loadSelectedEntry() {
  if (!selectedDateKey) {
    return undefined;
  }

  return loadEntryForDate(selectedDateKey);
}

export async function initializeEntryStore() {
  await initializeEntryDatabase();
}

export async function loadEntryForDate(dateKey: string) {
  const entry = await getPersistedEntryForDate(dateKey);

  if (entry) {
    entriesByDate = {
      ...entriesByDate,
      [dateKey]: entry,
    };
  } else if (entriesByDate[dateKey]) {
    const nextEntries = { ...entriesByDate };
    delete nextEntries[dateKey];
    entriesByDate = nextEntries;
  }

  return entry;
}

export async function saveEntry(entry: HabitEntry) {
  await upsertEntry(entry);

  entriesByDate = {
    ...entriesByDate,
    [entry.date]: entry,
  };
}

export async function deleteEntry(dateKey: string) {
  await deletePersistedEntry(dateKey);

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
  const { start, end } = getHeatmapDateRange(weeksCount);

  return buildHeatmapWeeks(start, end, weeksCount);
}

export async function loadHeatmapWeeks(weeksCount = DEFAULT_WEEKS_COUNT) {
  const { startKey, endKey, start, end } = getHeatmapDateRange(weeksCount);
  const entries = await getEntriesInRange(startKey, endKey);

  entriesByDate = entries.reduce<EntryMap>(
    (nextEntries, entry) => ({
      ...nextEntries,
      [entry.date]: entry,
    }),
    {}
  );

  return buildHeatmapWeeks(start, end, weeksCount);
}

function getHeatmapDateRange(weeksCount: number) {
  const today = new Date();
  const todayKey = getDateKey(today);
  const start = new Date(today);
  start.setDate(today.getDate() - (weeksCount - 1) * 7);

  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);

  return {
    today,
    todayKey,
    start,
    startKey: getDateKey(start),
    end: today,
    endKey: todayKey,
  };
}

function buildHeatmapWeeks(start: Date, today: Date, weeksCount: number): HeatWeekProps[] {
  const todayKey = getDateKey(today);
  const result: HeatWeekProps[] = [];

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
