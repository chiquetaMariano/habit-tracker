import * as SQLite from "expo-sqlite";
import type { HabitEntry } from "./entryStore";

type HabitEntryRow = {
  date: string;
  status: HabitEntry["status"];
  completions: number;
  note: string;
};

const DATABASE_NAME = "habit-tracker.db";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initializationPromise: Promise<void> | null = null;

function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initializeEntryDatabase() {
  if (!initializationPromise) {
    initializationPromise = getDatabase().then((database) =>
      database.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS habit_entries (
          date TEXT PRIMARY KEY NOT NULL,
          status TEXT NOT NULL,
          completions INTEGER NOT NULL DEFAULT 0,
          note TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `)
    );
  }

  return initializationPromise;
}

export async function getEntryForDate(dateKey: string) {
  await initializeEntryDatabase();

  const database = await getDatabase();
  const row = await database.getFirstAsync<HabitEntryRow>(
    `SELECT date, status, completions, note
     FROM habit_entries
     WHERE date = ?`,
    dateKey
  );

  return row ? mapRowToEntry(row) : undefined;
}

export async function getEntriesInRange(startDateKey: string, endDateKey: string) {
  await initializeEntryDatabase();

  const database = await getDatabase();
  const rows = await database.getAllAsync<HabitEntryRow>(
    `SELECT date, status, completions, note
     FROM habit_entries
     WHERE date BETWEEN ? AND ?
     ORDER BY date ASC`,
    startDateKey,
    endDateKey
  );

  return rows.map(mapRowToEntry);
}

export async function upsertEntry(entry: HabitEntry) {
  await initializeEntryDatabase();

  const database = await getDatabase();
  const timestamp = new Date().toISOString();

  await database.runAsync(
    `INSERT INTO habit_entries (
       date,
       status,
       completions,
       note,
       created_at,
       updated_at
     )
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET
       status = excluded.status,
       completions = excluded.completions,
       note = excluded.note,
       updated_at = excluded.updated_at`,
    entry.date,
    entry.status,
    entry.completions,
    entry.note,
    timestamp,
    timestamp
  );
}

export async function deleteEntry(dateKey: string) {
  await initializeEntryDatabase();

  const database = await getDatabase();
  await database.runAsync("DELETE FROM habit_entries WHERE date = ?", dateKey);
}

function mapRowToEntry(row: HabitEntryRow): HabitEntry {
  return {
    date: row.date,
    status: row.status,
    completions: row.completions,
    note: row.note,
  };
}
