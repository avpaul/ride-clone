import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Toast from "../../atoms/Toast";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import Toolbar from "../../organisms/Toolbar";
import PointService from "../../../services/point-service";
import { useSelector, useDispatch } from "react-redux";
import RouteService from "../../../services/route-service";
import placesService from "../../../services/places-service";
import { Marker } from "react-native-maps";
import GuideService from "../../../services/guide-service";
import ToastService from "../../../services/toast-service";
import BottomNavigation from "../../organisms/BottomNavigation";
import {
  directionsToNearestPoints,
  handlePointPressed,
  handleLocationChange,
  handleSetSelectedPointRoute,
  handleSelectedPointMarkers,
  handleSetVehicles,
} from "../../../handlers/home";
import { GUIDE_FOR_MARKER_PRESS } from "../../../constants/notification";
import { hideToast } from "../../../redux/actions/toast";

const Home = ({ navigation }) => {
  const routeService = new RouteService();
  const guideService = new GuideService();
  const dispatch = useDispatch();

  const [routes, setRoutes] = useState([]);
  const [vehiclesMarkers, setVehiclesMarkers] = useState([]);
  const [routesMarker, setRoutesMarker] = useState([]);
  const [selectedRouteMarkers, setSelectedRouteMarkers] = useState([]);
  const [nearestPointsRoutes, setNearestPointsRoutes] = useState([]);
  const [mapView, setMapView] = useState({});
  const [unFocusedToolbar, setUnFocusedToolbar] = useState(false);
  const [nearByPoints, setNearByPoints] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState();

  const { currentLocation } = useSelector(({ location }) => location);
  const selectedPointRoute = useSelector(
    ({ routes: { selectedPointRoute } }) => selectedPointRoute
  );
  const { data: vehicles } = useSelector(({ vehicles }) => vehicles);

  const handleMapPress = () => {
    setUnFocusedToolbar(true);
  };

  const handleSetMapView = (mapRef) => {
    setMapView(mapRef);
  };

  const handleNavigation = (screen, props) => {
    navigation.navigate(screen, { ...props });
  };

  const onPointPressed = async (data) => {
    hideToast()(dispatch);
    await handlePointPressed(
      data,
      setNearestPointsRoutes,
      setRoutesMarker,
      dispatch
    );
  };

  useEffect(() => {
    handleSetVehicles(vehicles, setVehiclesMarkers, mapView);
  }, [vehicles]);

  useEffect(() => {
    handleSetSelectedPointRoute(selectedPointRoute, setRoutes, routeService);
    handleSelectedPointMarkers(selectedPointRoute, setSelectedRouteMarkers);
  }, [selectedPointRoute]);

  useEffect(() => {
    const updateCurrentLocation = async () => {
      if (currentLocation) {
        ToastService.showMarkerGuideToast(GUIDE_FOR_MARKER_PRESS, dispatch);

        setNearByPoints(
          await PointService.getNearbyPoints(
            { onPress: onPointPressed },
            currentLocation
          )
        );
      }
    };
    updateCurrentLocation();
  }, [currentLocation]);

  const onMapReady = async (mapRef) => {
    setMapView(mapRef);

    handleLocationChange(dispatch, async () =>
      setNearByPoints(
        await PointService.getNearbyPoints(
          { onPress: onPointPressed },
          currentLocation
        )
      )
    );
    directionsToNearestPoints(setNearestPointsRoutes)(dispatch);
  };

  const { destination: destinationAddress } = useSelector(
    ({ search }) => search
  );

  useEffect(() => {
    // Searches for the provided location then shows the nearest bus stops
    const showDestinationMarker = async () => {
      if (destinationAddress) {
        const destination = await placesService.getPlaceLatLng(
          destinationAddress
        );
        setDestinationLocation(<Marker coordinate={destination} />);
        setNearByPoints(
          await PointService.getNearbyPoints(
            { onPress: onPointPressed },
            destination
          )
        );
      }
    };
    showDestinationMarker();
  }, [destinationAddress]);

  return (
    <>
      <View>
        <HomeTemplate
          mapView={
            <MapView
              mapRef={handleSetMapView}
              onPress={handleMapPress}
              onMapReady={onMapReady}
              markers={[
                ...nearByPoints,
                routesMarker,
                destinationLocation,
                ...selectedRouteMarkers,
                ...vehiclesMarkers,
              ]}
              routes={[...routes, ...nearestPointsRoutes]}
            />
          }
          toolbar={<Toolbar unFocused={unFocusedToolbar} mapView={mapView} />}
          bottomNavigation={
            <BottomNavigation navigationHandler={handleNavigation} />
          }
        />
      </View>
      <Toast />
    </>
  );
};

export default Home;
