import { FC } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

const INTENSITY_COLORS = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];

export type HeatCellProps = {
    value: number;
    level: number;
    date: Date;
}

const HeatCell: FC<HeatCellProps> = ({
    value,
    level,
    date
}) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD">
            <View
                style={[
                    styles.cell,
                    {
                        backgroundColor: INTENSITY_COLORS[Math.floor(Math.random() * 5) + 1], // replace with level
                        opacity: value === 0 ? 0.4 : 1,
                    }
                ]} />
        </TouchableHighlight>
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