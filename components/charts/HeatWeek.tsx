import { FC } from "react";
import { StyleSheet, View } from "react-native";
import HeatCell, { type HeatCellProps } from "./HeatCell";

export type HeatWeekProps = {
    cells: HeatCellProps[];
    selectedDateKey?: string | null;
    onSelectDate?: (date: string) => void;
}

const HeatWeek: FC<HeatWeekProps> = ({cells, selectedDateKey, onSelectDate}) => {
    return (
        <View style={styles.week}>
            {
                cells.map((cell, i) => 
                <HeatCell 
                    key={i}
                    selected={cell.date.slice(0, 10) === selectedDateKey}
                    onPress={onSelectDate}
                    {...cell} />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    week: {
        flexDirection: 'column',
        gap: 3
    }
})

export default HeatWeek;
