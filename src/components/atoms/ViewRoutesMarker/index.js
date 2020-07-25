import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Marker } from "react-native-maps";
import RouteIcon from "../../../assets/icons/route";
import { whiteColor, primaryColor } from "../../../styles/colors";
import { getPointRoutes } from "../../../redux/actions/routes";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_POINT_ROUTE } from "../../../constants/point";
import { previewRoute, showBottomSheet } from "../../../redux/actions/navigation";
import PointBadge from "../PointBadge";

const ViewRoutesMarker = ({ id, coordinate, distance, style }) => {
  const dispatch = useDispatch();

  const { loading, loaded } = useSelector(
    ({ routes: { pointRoutes } }) => pointRoutes
  );
  const { routePreview } = useSelector(({ navigation }) => navigation);

  const handleGetPointRoutes = () => {
    previewRoute()(dispatch); // Show cancel button on the bottom
    // getPointRoutes(id)(dispatch);
    getPointRoutes(id, { lat: coordinate.latitude, lon: coordinate.longitude })(
      dispatch
    );
    showBottomSheet()(dispatch)
  };

  if (!routePreview) {
    return <></>;
  }

  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: 0.18, y: 2.5 }}
      style={_style.marker}
      onPress={handleGetPointRoutes}
    >
      <PointBadge text={distance} />

      {/* <View style={{ ..._style.container, ...style }}>
        {loading && (
          <View style={_style.loader}>
            <Text style={_style.text}>Loading routes..</Text>
            <ActivityIndicator size="small" color={whiteColor} />
          </View>
        )}

        {!loading && !loaded && (
          <View style={_style.view_routes}>
            <Text style={_style.text}>{SHOW_POINT_ROUTE}</Text>
            <RouteIcon width={20} height={20} />
          </View>
        )}
      </View> */}
    </Marker>
  );
};

const _style = StyleSheet.create({
  marker: {
    zIndex: 99999,
  },
  container: {
    minWidth: 220,
    borderRadius: 5,
  },
  loader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    paddingLeft: 5,
    fontWeight: "500",
    fontSize: 15,
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  view_routes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 240,
    borderRadius: 5,
    padding: 10,
    backgroundColor: primaryColor,
  },
});

ViewRoutesMarker.defaultProps = {};

ViewRoutesMarker.propTypes = {};

export default ViewRoutesMarker;
