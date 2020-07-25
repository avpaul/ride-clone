import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigationButton from "../../molecules/BottomNavigationButton";
import CancelIcon from "../../../assets/icons/close-cp.svg";
import RouteIcon from "../../../assets/icons/road-sign.svg";
import { height, width } from "../../../constants/dimensions";
import { whiteColor, transparent, mapColor } from "../../../styles/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  clearPointRoutes,
  clearSelectedPointRoute
} from "../../../redux/actions/routes";
import { clearAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import { cancelRoutePreview } from "../../../redux/actions/navigation";

const _styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: height(4),
    paddingLeft: width(4),
    paddingRight: width(4)
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
    <LinearGradient colors={[transparent, mapColor, mapColor]}>
      <View
        style={{
          ..._styles.wrapper,
          justifyContent: routePreview ? "space-between" : "flex-end"
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
  );
};

export default BottomNavigation;
