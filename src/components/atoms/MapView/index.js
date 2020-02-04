import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import GOOGLE_MAP_SILVER_STYLE from "../../../styles/googleMapSilver";
import { FULL_WIDTH, FULL_HEIGHT } from "../../../constants/dimensions";
import { KIGALI_COORDINATES } from "../../../constants/coordinates";
import LocationService from "../../../services/location-service";

function MapViewWrapper({ style, initialRegion, mapRef, markers, ...props }) {
  const mapView = useRef();

  const mapReady = () => {
    LocationService.moveTocurrentLocation(mapView);
  };

  useEffect(() => {
    mapRef(mapView);
  }, [mapView]);

  return (
    <MapView
      ref={mapView}
      style={{ ..._style, ...style }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={GOOGLE_MAP_SILVER_STYLE}
      showsUserLocation={true}
      initialRegion={initialRegion}
      onMapReady={mapReady}
      {...props}
    >
      {markers.map((marker, index) => (
        <View key={index}>{marker}</View>
      ))}
    </MapView>
  );
}

MapViewWrapper.defaultProps = {
  mapRef: () => null,
  initialRegion: KIGALI_COORDINATES,
  markers: []
};

MapViewWrapper.propTypes = {
  mapRef: PropTypes.func,
  initialRegion: PropTypes.instanceOf(Object),
  markers: PropTypes.instanceOf(Array)
};

const _style = StyleSheet.create({
  width: FULL_WIDTH,
  height: FULL_HEIGHT
});

export default MapViewWrapper;
