import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-navigation';
import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";

const HomeTemplate = ({ toolbar, bottomNavigation, mapView }) => {
  return (
    <SafeAreaView style={style.container} forceInset={{ bottom: 'never'}}>
      <View style={style.mapView}>{mapView}</View>
      <View style={style.toolbar}>{toolbar}</View>
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
    justifyContent: "space-between",
  },
  toolbar: {
    padding: 20
  },
  mapView:{
    position: "absolute",
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
  bottomNavigation: PropTypes.instanceOf(Object),
  mapView: PropTypes.instanceOf(Object).isRequired,
};


export default HomeTemplate;
