import React from "react";
import GuideService from "../../services/guide-service";
import RouteService from "../../services/route-service";
import LocationService from "../../services/location-service";
import { toggleLoader } from "../../redux/actions/loader";
import { LOADING_ROUTE, LOADING_NEAREST_ROUTE } from "../../constants/loader";
import ViewRoutesMarker from "../../components/atoms/ViewRoutesMarker";
import { setSelectedPointRoute } from "../../redux/actions/routes";

const guideService = new GuideService();

export const handleSetSelectedPointRoute = (
  selectedPointRoute,
  setRoutes,
  routeService
) => {
  if (!selectedPointRoute) return setRoutes([]);
  const {
    points: [origin, ...waypoints],
    name
  } = selectedPointRoute;
  setRoutes([
    routeService.addRoute({
      id: name,
      origin,
      waypoints,
      destination: waypoints.pop() || {},
      type: "secondary"
    })
  ]);
};

export const directionsToNearestPoints = setNearestPointsRoutes => async dispatch => {
  const routeService = new RouteService();
  toggleLoader({ message: LOADING_NEAREST_ROUTE, loading: true })(dispatch);

  const {
    location: { coords: currentLocation } = {}
  } = await LocationService.getCurrentLocation();

  const nearestPoint = await guideService.getClosestPointToDestination(
    currentLocation
  );

  setNearestPointsRoutes(
    routeService.addRoute({
      origin: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      destination: {
        latitude: nearestPoint.latitude,
        longitude: nearestPoint.longitude
      },
      id: nearestPoint.key
    })
  );

  toggleLoader({ loading: false })(dispatch);
};

export const handlePointPressed = async (
  { latitude, longitude, id },
  setNearestPointsRoutes,
  setRoutesMarker,
  dispatch
) => {
  setRoutesMarker([
    <ViewRoutesMarker key="1" coordinate={{ latitude, longitude }} id={id} />
  ]);

  setNearestPointsRoutes([]);
  toggleLoader({ message: LOADING_ROUTE, loading: true })(dispatch);

  const routeService = new RouteService();

  const {
    location: { coords: currentLocation } = {}
  } = await LocationService.getCurrentLocation();

  setNearestPointsRoutes(
    routeService.addRoute({
      origin: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      destination: {
        latitude,
        longitude
      },
      id: "1"
    })
  );

  toggleLoader({ loading: false })(dispatch);
};

export const handleLocationChange = async (dispatch, setNearByPoints) => {
  await LocationService.watchLocation(dispatch, setNearByPoints);
};
