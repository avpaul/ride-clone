import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import SafeAreaView from 'react-navigation';
import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";

const HomeTemplate = ({ toolbar, bottomNavigation, mapView }) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.toolbar}>{toolbar}</View>
      {mapView}
      <View>{bottomNavigation}</View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  toolbar: {
    padding: 20
  },
  bottomNavigation: {
    padding: 20,
    paddingBottom: 40
  }
});

HomeTemplate.defaultProps = {
  toolbar: null,
  bottomNavigation: null
};

HomeTemplate.propTypes = {
  toolbar: PropTypes.instanceOf(Object),
  bottomNavigation: PropTypes.instanceOf(Object)
};

export default HomeTemplate;
