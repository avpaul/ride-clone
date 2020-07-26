import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { whiteColor, primaryColor } from "../../../styles/colors";
import ArrowRight from "../../../../assets/icons/arrow_right";

const BusBadge = ({ id, text }) => {
  return (
    <View style={style.container}>
      <View style={style.idWrapper}>
        <Text style={style.id}>{id}</Text>
      </View>
      <View style={style.textWrapper}>
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
    borderColor: "#e8e8e8",
  },
  idWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: whiteColor,
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: primaryColor,
  },
  id: {
    color: "#222",
    fontSize: 13,
    fontWeight: "600",
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

export default BusBadge;
