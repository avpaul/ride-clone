import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CUSTOM_MAP_STYLE from "../../../styles/customMapStyle";
import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";
import { KIGALI_COORDINATES } from "../../../constants/coordinates";
import LocationService from "../../../services/location-service";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../../../redux/actions/location";

function MapViewWrapper({
  style,
  initialRegion,
  mapRef,
  markers,
  routes,
  children,
  onMapReady,
  ...props
}) {
  const mapView = useRef();
  const dispatch = useDispatch();

  const mapReady = async () => {
    onMapReady(mapView);

    const { location } = await LocationService.getCurrentLocation();
    setCurrentLocation(location)(dispatch);
    
    // LocationService.moveTocurrentLocation(mapView);
  };

  useEffect(() => {
    mapRef(mapView);
  }, [mapView]);

  return (
    <MapView
      ref={mapView}
      style={{ ..._style, ...style }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={CUSTOM_MAP_STYLE}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapPadding={{ top: 0, right: 10, bottom: 110, left: 0 }}
      initialRegion={initialRegion}
      onMapReady={mapReady}
      {...props}
    >
      {markers.map((marker, index) => (
        <React.Fragment key={index}>{marker}</React.Fragment>
      ))}

      {routes.map((route, index) => (
        <React.Fragment key={index}>{route}</React.Fragment>
      ))}

      {children}
    </MapView>
  );
}

MapViewWrapper.defaultProps = {
  mapRef: () => null,
  initialRegion: KIGALI_COORDINATES,
  markers: [],
  routes: [],
  onMapReady: () => null,
};

MapViewWrapper.propTypes = {
  mapRef: PropTypes.func,
  initialRegion: PropTypes.instanceOf(Object),
  markers: PropTypes.instanceOf(Array),
  routes: PropTypes.instanceOf(Array),
  onMapReady: PropTypes.func,
};

const _style = StyleSheet.create({
  width: FULL_WIDTH,
  height: FULL_HEIGHT
});

export default MapViewWrapper;
