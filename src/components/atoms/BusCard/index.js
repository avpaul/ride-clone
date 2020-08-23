import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { box_shadow } from "../../../styles";
import BusIcon from "../../../../assets/icons/bus.svg";

const BusCard = ({ time = "", busNumber, route, index }) => {
  const times = time.split(" ");
  const timeText = () => {
    if (times[1] === "Min") return "minutes";
    if (times[1] === "H") return "hours";
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.top}>
        <Text
          style={[styles.time, { color: index === 0 ? "#f93955" : "#111" }]}
        >
          {times[0]}
        </Text>
        <Text
          style={[styles.timeText, { color: index === 0 ? "#f93955" : "#111" }]}
        >
          {timeText()}
        </Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.middle}>
          <BusIcon width={20} height={20} />
          <Text style={styles.busNumber}>{busNumber}</Text>
        </View>

        <Text style={styles.routeName}>
          {route ? route.split("-")[0] : ''} - {route ? route.split("-")[route.split("-").length - 1] : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    minWidth: 170,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    ...box_shadow,
    marginTop: 2,
    marginBottom: 10,
  },
  top: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  time: {
    fontSize: 50,
    // marginRight: 10,
    fontWeight: "800",
  },
  timeText: {
    fontSize: 18,
    fontWeight: "500",
  },
  textLight: {
    fontWeight: "300",
    marginBottom: 5,
  },
  middle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -4,
    marginBottom: 6,
  },
  busNumber: {
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 5,
  },
  routeName: {
    fontSize: 15,
    paddingTop: 5,
    fontWeight: "500",
  },
});

export default BusCard;
