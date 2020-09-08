import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-navigation";
import AlertIcon from "../../../../assets/icons/alert";

import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";
import { whiteColor } from "../../../styles/colors";
import { box_shadow } from "../../../styles";

const HomeTemplate = ({ toolbar, bottomNavigation, mapView, bottomSheet }) => {
  return (
    <SafeAreaView style={style.container} forceInset={{ bottom: "never" }}>
      <View style={style.mapView}>{mapView}</View>
      <View style={style.toolbar}>
        {toolbar}
        {/* <View>
          <View style={style.alert}>
            <AlertIcon width={30} height={30} />
          </View>
        </View> */}
      </View>
      <View style={style.bottomNavigation}>{bottomNavigation}</View>
      <View style={style.bottomSheet}>{bottomSheet}</View>
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
    flexDirection: "row",
    marginTop: Platform.OS === 'android' ? 30 : 0,
    padding: 10,
    paddingTop: 0,
  },
  mapView: {
    position: "absolute",
  },
  bottomNavigation: {},
  bottomSheet: {
    position: "absolute",
  },
  alert: {
    padding: 15,
    // backgroundColor: whiteColor,
    // ...box_shadow,
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
