import { StyleSheet, Text, View } from "react-native";

const WEEK_GAP = 3;
const WEEKDAY_COL_WIDTH = 34;

type WeekdayLabelsProps = {
    monthLabels: string[];
    showWeekdayLabels?: boolean;
};

export default function WeekdayLabels({
    monthLabels,
    showWeekdayLabels = true,
}: WeekdayLabelsProps) {
    return (
        <View style={styles.monthsRow}>
            {showWeekdayLabels ? <View style={styles.monthsLeftSpacer} /> : null}
            <View style={styles.monthsTrack}>
                {monthLabels.map((label, i) => (
                    <View key={`m-${i}`} style={styles.monthCell}>
                        <Text style={styles.monthText}>{label}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monthsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    monthsLeftSpacer: {
        width: WEEKDAY_COL_WIDTH,
        marginRight: 8,
    },
    monthsTrack: {
        flexDirection: "row",
        gap: WEEK_GAP,
    },
    monthCell: {
        width: 12,
        position: "relative",
        overflow: "visible",
    },
    monthText: {
        color: "rgba(255,255,255,0.72)",
        fontSize: 11,
        lineHeight: 14,
    },
})
