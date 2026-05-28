import HeatWeek from '@/components/HeatWeek';
import { ScrollView, StyleSheet, View } from 'react-native';

let week = [
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 0,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
  {
    value: 1,
    level: Math.floor(Math.random() * 5) + 1,
    date: new Date()
  },
];

const createArray = (length: number) => [...Array(length)];

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.heatmap}>
          {
            createArray(53).map((n, i) => <HeatWeek cells={week} key={i} />)
          }
        </View>
        <View style={styles.info} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    width: "100%"
  },
  heatmap: {
    flex: 1,
    width: "100%",
    marginTop: 100,
    paddingTop: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  info: {
    flex: 2,
    backgroundColor: "#36454F"
  }
});
