import { FC } from "react";
import { StyleSheet, View } from "react-native";

const INTENSITY_COLORS = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];

export type HeatCellProps = {
    value: number;
    level: number;
    date: string;
}

const HeatCell: FC<HeatCellProps> = ({
    value,
    level,
    date
}) => {
    return (
        <View
            style={[
                styles.cell,
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
})

export default HeatCell;