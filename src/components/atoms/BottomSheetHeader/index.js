import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CancelIcon from "../../../../assets/icons/cancel";
import { whiteColor } from "../../../styles/colors";

const BottomSheetHeader = () => {
  return <View style={style.container}></View>;
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 20,
    backgroundColor: whiteColor,
  },
});

export default BottomSheetHeader;
