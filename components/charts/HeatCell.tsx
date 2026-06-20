import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

const INTENSITY_COLORS = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];

export type HeatCellProps = {
    value: number;
    level: number;
    date: string;
    selected?: boolean;
    onPress?: (date: string) => void;
}

const HeatCell: FC<HeatCellProps> = ({
    value,
    level,
    date,
    selected = false,
    onPress,
}) => {
    return (
        <Pressable
            onPress={() => onPress?.(date)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={`Select entry for ${new Date(date).toDateString()}`}
            style={[
                styles.cell,
                selected && styles.selectedCell,
                {
                    backgroundColor: INTENSITY_COLORS[level],
                    opacity: value === 0 ? 0.4 : 1,
                }
            ]} />
    )
}

const styles = StyleSheet.create({
    cell: {
        width: 12,
        height: 12,
        borderRadius: 2,
    },
    selectedCell: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        transform: [{ scale: 1.15 }],
        shadowColor: "#FFFFFF",
        shadowOpacity: 0.35,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 2,
    },
})

export default HeatCell;
