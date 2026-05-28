import { FC } from "react";
import { View } from "react-native";
import HeatWeek, { type HeatWeekProps } from "./HeatWeek";

export type HeatMonthProps = {
    weeks: HeatWeekProps[];
}

const HeatMap: FC<HeatMonthProps> = ({weeks}) => {
    return (
        <View>
            {
                weeks.map(week => <HeatWeek {...week} />)
            }
        </View>
    )
}

export default HeatMap;