import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigationButton from "../../molecules/BottomNavigationButton";
import CancelIcon from "../../../assets/icons/close-cp.svg";
import RouteIcon from "../../../assets/icons/road-sign.svg";
import { height, width } from "../../../constants/dimensions";
import { whiteColor, transparent, mapColor } from "../../../styles/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  clearPointRoutes,
  clearSelectedPointRoute,
} from "../../../redux/actions/routes";
import { clearAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import { cancelRoutePreview, showBottomSheet } from "../../../redux/actions/navigation";

import ArrowUpIcon from "../../../../assets/icons/arrow-up";

const _styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 60,
    paddingLeft: width(4),
    paddingRight: width(4),
  },
  bottomSheet: {
    position: "absolute",
    bottom: 20,
    width: 100,
    backgroundColor: whiteColor,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  arrow:{
    paddingVertical:5,
    paddingHorizontal: 40,
    backgroundColor: whiteColor
  }
});

const BottomNavigation = ({ navigationHandler }) => {
  const dispatch = useDispatch();

  const { routePreview } = useSelector(({ navigation }) => navigation);

  const cancelHandler = () => {};

  const routesHandler = () => {
    navigationHandler("Routes", {});
  };

  const handleCancelPressed = () => {
    clearPointRoutes()(dispatch);
    clearSelectedPointRoute()(dispatch);
    clearAutocompletePredictions()(dispatch);
    cancelRoutePreview()(dispatch);
  };


  return (
    <>
      <LinearGradient colors={[transparent, mapColor, mapColor]}>
        <View
          style={{
            ..._styles.wrapper,
            justifyContent: routePreview ? "space-between" : "flex-end",
          }}
        >
          {routePreview && (
            <BottomNavigationButton
              title={"Cancel"}
              Icon={CancelIcon}
              pressHandler={cancelHandler}
              label={"Cancel"}
              size={24}
              pressHandler={handleCancelPressed}
            />
          )}
          <BottomNavigationButton
            title={"Routes"}
            Icon={RouteIcon}
            pressHandler={routesHandler}
            label={"Routes"}
          />
        </View>
      </LinearGradient>
      <TouchableOpacity style={_styles.bottomSheet} onPress={() => showBottomSheet()(dispatch)}>
        <View style={_styles.arrow}>
          <ArrowUpIcon width={20} height={20} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BottomNavigation;
