import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { whiteColor } from "../../../styles/colors";
import ArrowRight from "../../../../assets/icons/arrow_right";

const PointBadge = ({ text }) => {
  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.text}>{text}</Text>
      </View>
      <View style={style.icon}>
        <ArrowRight width={20} height={20} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: whiteColor,
    borderWidth: 1,
    borderColor: '#e8e8e8'
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#222",
  },
  text: {
    color: whiteColor,
    fontSize: 12,
    fontWeight: "400",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
});

export default PointBadge;
