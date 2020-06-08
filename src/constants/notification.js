import React from "react";
import { View, Image, Text } from "react-native";
import point from "../assets/images/drop-off-point.png";

export const GUIDE_FOR_MARKER_PRESS = () => (
  <View style={{ flexDirection: "row", alignItems: "center", paddingRight:0}}>
    <Image source={point} style={{ width: 30, height: 30, marginRight:10}} />
    <Text
      style={{
        fontSize: 15,
        fontWeight: "300",
        flexWrap: "wrap",
        maxWidth: '85%',
      }}
    >
      You can click on the bus stop marker found on the map to search for routes
    </Text>
  </View>
);
