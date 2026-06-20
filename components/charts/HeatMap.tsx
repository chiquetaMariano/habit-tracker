import { FC, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HeatWeek, { type HeatWeekProps } from "./HeatWeek";

export type HeatMonthProps = {
    weeks: HeatWeekProps[];
    showWeekdayLabels?: boolean;
    selectedDateKey?: string | null;
    onSelectDate?: (date: string) => void;
}

const CELL_SIZE = 12;
const CELL_GAP = 3;
const WEEK_GAP = 3;
const WEEKDAY_COL_WIDTH = 34;
const MONTH_LABEL_WIDTH = 36;
const MONTHS_ROW_HEIGHT = 18;

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEGEND_COLORS = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"];

function getMonthLabels(weeks: HeatWeekProps[]) {
  return weeks.map((week, i) => {
    const curr = new Date(week.cells[0].date).getMonth();
    const prev = i > 0 ? new Date(weeks[i - 1].cells[0].date).getMonth() : -1;
    return curr !== prev ? MONTH_SHORT[curr] : "";
  });
}

const HeatMap: FC<HeatMonthProps> = ({
    weeks,
    showWeekdayLabels = true,
    selectedDateKey,
    onSelectDate,
}) => {
    const scrollRef = useRef<ScrollView>(null);
    const monthLabels = getMonthLabels(weeks);

    useEffect(() => {
        requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: false });
        });
    }, [weeks]);

    return (
        <View style={styles.container}>
            
            {/* Grid body */}
            <View style={styles.bodyRow}>
                {showWeekdayLabels ? (
                    <View style={styles.weekdaysCol}>
                    {WEEKDAY_LABELS.map((day) => (
                        <View key={day} style={styles.weekdayCell}>
                        <Text style={styles.weekdayText}>{day}</Text>
                    </View>
                    ))}
                </View>
                ) : null}

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.monthsRow}>
                        <View style={styles.monthsTrack}>
                            {monthLabels.map((label, i) => (
                            <View key={`m-${i}`} style={styles.monthCell}>
                                {label ? <Text style={styles.monthText}>{label}</Text> : null}
                            </View>
                            ))}
                        </View>
                        </View>

                        <View style={styles.weeksRow}>
                        {weeks.map((week, i) => (
                            <HeatWeek
                                key={`w-${i}`}
                                {...week}
                                selectedDateKey={selectedDateKey}
                                onSelectDate={onSelectDate}
                            />
                        ))}
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
                <Text style={styles.legendText}>Less</Text>
                <View style={styles.legendScale}>
                {LEGEND_COLORS.map((color, i) => (
                    <View key={`lg-${i}`} style={[styles.legendCell, { backgroundColor: color }]} />
                ))}
                </View>
                <Text style={styles.legendText}>More</Text>
            </View>
        </View>
    )
}

export default HeatMap;

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    monthsLeftSpacer: {
        width: WEEKDAY_COL_WIDTH,
        marginRight: 8,
    },
    bodyRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    weekdaysCol: {
        width: WEEKDAY_COL_WIDTH,
        marginRight: 8,
        gap: CELL_GAP,
        marginTop: MONTHS_ROW_HEIGHT,
    },
    weekdayCell: {
        height: CELL_SIZE,
        justifyContent: "center",
    },
    weekdayText: {
        color: "rgba(255,255,255,0.72)",
        fontSize: 11,
        lineHeight: 12,
    },
    legendRow: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    legendText: {
        color: "rgba(255,255,255,0.82)",
        fontSize: 14,
        lineHeight: 18,
    },
    legendScale: {
        flexDirection: "row",
        gap: 6,
    },
    legendCell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderRadius: 2,
    },
    monthsRow: {
        minHeight: MONTHS_ROW_HEIGHT,
        marginBottom: 6,
        justifyContent: "flex-start",
    },
    monthsTrack: {
        flexDirection: "row",
        gap: WEEK_GAP, // must match weeksRow
    },
    monthCell: {
        width: CELL_SIZE, // must match week column width
        position: "relative",
        overflow: "visible",
    },
    monthText: {
        position: "absolute",
        left: 0,         // anchored at month-start week
        top: 0,
        width: MONTH_LABEL_WIDTH,
        color: "rgba(255,255,255,0.72)",
        fontSize: 11,
        lineHeight: 14,
    },
    weeksRow: {
        flexDirection: "row",
        gap: WEEK_GAP,   // must match monthsTrack
    },
});
