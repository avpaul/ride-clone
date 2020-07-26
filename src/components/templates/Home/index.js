import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";

import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";
import { useSelector } from "react-redux";
import { whiteColor } from "../../../styles/colors";

const HomeTemplate = ({ toolbar, bottomNavigation, mapView, bottomSheet }) => {

  const showBottomSheet = useSelector(
    ({ navigation: { bottomSheet } }) => bottomSheet
  );

  return (
    <SafeAreaView style={style.container} forceInset={{ bottom: "never" }}>
      <View style={style.mapView}>{mapView}</View>
      <View style={style.toolbar}>{toolbar}</View>
      <View style={style.bottomNavigation}>{bottomNavigation}</View>
      {showBottomSheet && <View style={style.bottomSheet}>{bottomSheet}</View>}
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
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
  },
  mapView: {
    position: "absolute",
  },
  bottomNavigation: {},
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: whiteColor,
    height: '50%',
  },
});

HomeTemplate.defaultProps = {
  toolbar: null,
  bottomNavigation: null,
};

HomeTemplate.propTypes = {
  toolbar: PropTypes.instanceOf(Object),
  bottomNavigation: PropTypes.instanceOf(Object),
  mapView: PropTypes.instanceOf(Object).isRequired,
};

export default HomeTemplate;
