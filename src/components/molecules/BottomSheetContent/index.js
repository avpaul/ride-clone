import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { whiteColor } from "../../../styles/colors";
import BusStopInfo from "../BusStopInfo";

const BottomSheetContent = ({ navigation }) => {
  return (
    <View style={style.container}>
      <BusStopInfo navigation={navigation} />
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
