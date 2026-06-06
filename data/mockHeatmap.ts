import { HeatCellProps } from "../components/charts/HeatCell";
import { HeatWeekProps } from "../components/charts/HeatWeek";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const randomLevel = () => {
  const r = Math.random();
  if (r < 0.25) return 0;
  if (r < 0.45) return 1;
  if (r < 0.65) return 2;
  if (r < 0.85) return 3;
  return 4;
};

export function createMockHeatmapWeeks(weeksCount = 53): HeatWeekProps[] {
  const today = new Date();
  const result: HeatWeekProps[] = [];

  // Start from Monday of the first generated week
  const start = new Date(today);
  start.setDate(today.getDate() - weeksCount * 7);
  const day = start.getDay(); // Sun=0..Sat=6
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);

  for (let w = 0; w < weeksCount; w++) {
    const cells: HeatCellProps[] = [];

    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);

      const isFuture = date > today;
      const level = isFuture ? 0 : randomLevel();

      cells.push({
        date: date.toISOString(),
        level: clamp(level, 0, 4),
        value: level > 0 ? 1 : 0,
      });
    }

    result.push({ cells });
  }

  return result;
}

export const MOCK_HEATMAP_WEEKS = createMockHeatmapWeeks(53);