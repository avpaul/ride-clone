import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { whiteColor } from "../../../styles/colors";
import BusStopInfo from "../BusStopInfo";
import GuideInfo from "../GuideInfo";
import { useSelector } from "react-redux";

const BottomSheetContent = ({ navigation, busStop, buses }) => {
  const { showBusesSheet } = useSelector(({ navigation }) => navigation);
  return (
    <View style={style.container}>
      {!showBusesSheet && <BusStopInfo navigation={navigation} />}
      {showBusesSheet && (
        <GuideInfo navigation={navigation} busStop={busStop} buses={buses} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 20,
    backgroundColor: whiteColor,
  },
});

export default BottomSheetContent;
