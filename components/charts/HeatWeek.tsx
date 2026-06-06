import { FC } from "react";
import { StyleSheet, View } from "react-native";
import HeatCell, { type HeatCellProps } from "./HeatCell";

export type HeatWeekProps = {
    cells: HeatCellProps[];
}

const HeatWeek: FC<HeatWeekProps> = ({cells}) => {
    return (
        <View style={styles.week}>
            {
                cells.map((cell, i) => 
                <HeatCell 
                    key={i}
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