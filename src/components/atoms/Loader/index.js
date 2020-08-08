import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { lightDark, whiteColor } from "../../../styles/colors";
import { box_shadow } from "../../../styles";

const Loader = ({ message, style }) => {
  return (
    <View style={{ ..._style.container, ...style }}>
      <Text style={_style.message}>{message}</Text>
      <ActivityIndicator size="small" color={lightDark} />
    </View>
  );
};

const _style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: whiteColor,
    ...box_shadow
  },
  message: {
    fontSize: 15
  }
});

Loader.defaultProps = {
  message: "Loading...",
  style: null
};

Loader.propTypes = {
  message: PropTypes.string,
  style: PropTypes.instanceOf(Object)
};

export default Loader;
