import React from "react";
import GuideService from "../../services/guide-service";
import RouteService from "../../services/route-service";
import LocationService from "../../services/location-service";
import { toggleLoader } from "../../redux/actions/loader";
import { LOADING_ROUTE, LOADING_NEAREST_ROUTE } from "../../constants/loader";
import ViewRoutesMarker from "../../components/atoms/ViewRoutesMarker";
import {
  setSelectedPointRoute,
  clearSelectedPointRoute,
} from "../../redux/actions/routes";
import { Marker } from "react-native-maps";
import PointService from "../../services/point-service";
import MapService from "../../services/map-service";
import VehicleService from "../../services/vehicle-service";
import { PARKING } from "../../constants/point";
import { EDGEPADDING } from "../../constants/map";
import { previewRoute } from "../../redux/actions/navigation";
import formatDistance from "../../helpers/formatDistance";

const guideService = new GuideService();

export const handleSetSelectedPointRoute = (
  selectedPointRoute,
  setRoutes,
  routeService
) => {
  if (!selectedPointRoute) return setRoutes([]);
  const {
    points: [origin, ...waypoints],
    name,
  } = selectedPointRoute;
  setRoutes([
    routeService.addRoute({
      id: name,
      origin,
      waypoints,
      destination: waypoints.pop() || {},
      type: "secondary",
    }),
  ]);
};

export const directionsToNearestPoints = (
  setNearestPointsRoutes,
  mapView
) => async (dispatch) => {
  const routeService = new RouteService();
  toggleLoader({ message: LOADING_NEAREST_ROUTE, loading: true })(dispatch);

  const {
    location: { coords: currentLocation } = {},
  } = await LocationService.getCurrentLocation();

  const nearestPoint = await guideService.getClosestPointToDestination(
    currentLocation
  );

  mapView.current.fitToCoordinates([currentLocation, nearestPoint], {
    edgePadding: {
      top: 150,
      bottom: 320,
      left: 10,
      right: 40,
    },
  });

  setNearestPointsRoutes(
    routeService.addRoute({
      origin: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      destination: {
        latitude: nearestPoint.latitude,
        longitude: nearestPoint.longitude,
      },
      id: nearestPoint.key,
    })
  );

  toggleLoader({ loading: false })(dispatch);
};

export const handlePointPressed = async (
  { latitude, longitude, id, distance },
  setNearestPointsRoutes,
  setRoutesMarker,
  dispatch
) => {
  setRoutesMarker([
    <ViewRoutesMarker
      key="1"
      coordinate={{ latitude, longitude }}
      distance={`${formatDistance(distance)}Km away`}
      id={id}
    />,
  ]);

  setNearestPointsRoutes([]);
  toggleLoader({ message: LOADING_ROUTE, loading: true })(dispatch);

  const routeService = new RouteService();

  const {
    location: { coords: currentLocation } = {},
  } = await LocationService.getCurrentLocation();

  setNearestPointsRoutes(
    routeService.addRoute({
      origin: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      destination: {
        latitude,
        longitude,
      },
      id,
    })
  );

  toggleLoader({ loading: false })(dispatch);
};

const parkingType = (index, route) => {
  if (index === 0) return PARKING;
  if (index === route.points.length - 1) return PARKING;
  return null;
};

export const handleSelectedPointMarkers = (
  selectedPointRoute,
  setSelectedRouteMarkers,
  mapView
) => {
  if (!selectedPointRoute) return setSelectedRouteMarkers([]);

  const markers = selectedPointRoute.points.map(
    ({ latitude, longitude }, index) =>
      PointService.point({
        id: index,
        latitude,
        longitude,
        type: parkingType(index, selectedPointRoute),
      })
  );
  setSelectedRouteMarkers(markers);
  mapView.current.fitToCoordinates(selectedPointRoute.points, {
    edgePadding: EDGEPADDING,
  });
};

export const handleSentMarkers = async (
  sentRoute,
  setSelectedRouteMarkers,
  setRoutes,
  routeService,
  dispatch,
  mapView
) => {
  if (!sentRoute) return setSelectedRouteMarkers([]);
  const route = await guideService.toLatLngPoint(sentRoute);

  const markers = route.points.map(({ latitude, longitude }, index) =>
    PointService.point({
      id: index,
      latitude,
      longitude,
      type: parkingType(index, route),
    })
  );

  clearSelectedPointRoute()(dispatch);

  handleSetSelectedPointRoute(route, setRoutes, routeService);
  setSelectedRouteMarkers(markers);

  mapView.current.fitToCoordinates(route.points, { edgePadding: EDGEPADDING });
  previewRoute()(dispatch);
};

export const handleSetVehicles = (vehicles, setVehiclesMarkers, mapView) => {
  const mapService = new MapService(mapView);
  const markers = vehicles.map(({ latitude, longitude, id }) =>
    VehicleService.vehicle({
      id,
      latitude,
      longitude,
    })
  );
  setVehiclesMarkers(markers);
  if (vehicles[0] && vehicles[0].latitude)
    mapService.moveToLocation({
      latitude: vehicles[0].latitude,
      longitude: vehicles[0].longitude,
    });
};

export const handleLocationChange = async (dispatch, setNearByPoints) => {
  await LocationService.watchLocation(dispatch, setNearByPoints);
};
