import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Marker } from "react-native-maps";
import RouteIcon from "../../../assets/icons/route";
import {
  whiteColor,
  primaryColor
} from "../../../styles/colors";
import { getPointRoutes } from "../../../redux/actions/routes";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_POINT_ROUTE } from "../../../constants/point";

const ViewRoutesMarker = ({ id, coordinate, style }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ routes: { pointRoutes } }) => pointRoutes);

  const handleGetPointRoutes = () => {
    getPointRoutes(id)(dispatch);
  };

  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: -0.1, y: 1 }}
      style={_style.marker}
      onPress={handleGetPointRoutes}
    >
      <View style={{ ..._style.container, ...style }}>
        {loading && (
          <View style={_style.loader}>
            <Text style={_style.text}>Loading routes..</Text>
            <ActivityIndicator size="small" color={whiteColor} />
          </View>
        )}

        {!loading && (
          <View style={_style.view_routes}>
            <Text style={_style.text}>{SHOW_POINT_ROUTE}</Text>
            <RouteIcon width={18} height={18}/>
          </View>
        )}
      </View>
    </Marker>
  );
};

const _style = StyleSheet.create({
  marker: {
    zIndex: 99999
  },
  container: {
    minWidth: 220,
    borderRadius: 5
  },
  loader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 5
  },
  text: {
    paddingLeft: 5,
    color: whiteColor,
    fontSize: 15
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  view_routes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    borderRadius: 5,
    padding: 10,
    backgroundColor: primaryColor
  }
});

ViewRoutesMarker.defaultProps = {};

ViewRoutesMarker.propTypes = {};

export default ViewRoutesMarker;
