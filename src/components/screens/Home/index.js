import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Toast from "../../atoms/Toast";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import Toolbar from "../../organisms/Toolbar";
import PointService from "../../../services/point-service";
import BusService from "../../../services/bus-service";
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
  handleSentMarkers,
  handleBusPressed,
  handleSetDestinationRoute,
} from "../../../handlers/home";
import { GUIDE_FOR_MARKER_PRESS } from "../../../constants/notification";
import { hideToast } from "../../../redux/actions/toast";
import BottomSheet from "../../organisms/BottomSheet";
import {
  showBottomSheet,
  showBusesSheet,
  hideBusesSheet,
} from "../../../redux/actions/navigation";
import LocationService from "../../../services/location-service";
import { EDGEPADDING } from "../../../constants/map";

const Home = ({ navigation }) => {
  const routeService = new RouteService();
  const guideService = new GuideService();
  const dispatch = useDispatch();

  const [routes, setRoutes] = useState([]);
  const [nearByBuses, setNearByBuses] = useState([]);
  const [vehiclesMarkers, setVehiclesMarkers] = useState([]);
  const [routesMarker, setRoutesMarker] = useState([]);
  const [busBadge, setBusBadge] = useState([]);
  const [selectedRouteMarkers, setSelectedRouteMarkers] = useState([]);
  const [nearestPointsRoutes, setNearestPointsRoutes] = useState([]);
  const [mapView, setMapView] = useState();
  const [unFocusedToolbar, setUnFocusedToolbar] = useState(false);
  const [nearByPoints, setNearByPoints] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState();
  const [destinationLocationRoute, setDestinationLocationRoute] = useState([]);

  const { currentLocation } = useSelector(({ location }) => location);
  const selectedPointRoute = useSelector(
    ({ routes: { selectedPointRoute } }) => selectedPointRoute
  );
  const { addressLocation = {} } = useSelector(({ search }) => search);

  const { data: vehicles } = useSelector(({ vehicles }) => vehicles);
  const { routePreview } = useSelector(({ navigation }) => navigation);
  const { destinationRoute } = useSelector(({ guide }) => guide);

  useEffect(() => {
    if (!routePreview) {
      setSelectedRouteMarkers([]);
      setRoutes([]);
      setDestinationLocation();
      setDestinationLocationRoute([]);
    }
  }, [routePreview]);

  useEffect(() => {
    if (destinationRoute.points) {
      handleSetDestinationRoute(
        destinationRoute,
        setRoutes,
        routeService,
        setSelectedRouteMarkers,
        mapView,
        setNearestPointsRoutes,
        currentLocation,
        setDestinationLocationRoute,
        addressLocation
      );
    }
  }, [destinationRoute]);

  //Show bottom sheet on start
  useEffect(() => {
    if (nearByPoints.length > 0) {
      showBusesSheet()(dispatch);
      showBottomSheet()(dispatch);
    }
  }, [nearByPoints]);

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

  const onBusPressed = async (data) => {
    hideToast()(dispatch);
    await handleBusPressed(data, setBusBadge, nearByPoints);
  };

  const { state: { params: { routeInfo: sentRoute } = {} } = {} } = navigation;

  useEffect(() => {
    // Show selected route from all routes
    if (sentRoute) {
      handleSentMarkers(
        sentRoute,
        setSelectedRouteMarkers,
        setRoutes,
        routeService,
        dispatch,
        mapView
      );
    }
  }, [sentRoute, mapView]);

  useEffect(() => {
    handleSetVehicles(vehicles, setVehiclesMarkers, mapView);
  }, [vehicles]);

  useEffect(() => {
    handleSetSelectedPointRoute(
      selectedPointRoute,
      setRoutes,
      routeService,
      mapView
    );
    handleSelectedPointMarkers(
      selectedPointRoute,
      setSelectedRouteMarkers,
      mapView
    );
  }, [selectedPointRoute]);

  useEffect(() => {
    const updateCurrentLocation = async () => {
      if (currentLocation && nearByPoints.length > 0) {
        setNearByBuses(
          await BusService.getNearbyBuses(
            { onPress: onBusPressed },
            currentLocation
          )
        );
      }
    };
    updateCurrentLocation();
  }, [currentLocation, nearByPoints]);

  useEffect(() => {
    const updateCurrentLocation = async () => {
      if (currentLocation) {
        // ToastService.showMarkerGuideToast(GUIDE_FOR_MARKER_PRESS, dispatch);

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

    handleLocationChange(dispatch, async () => {
      setNearByBuses(
        await BusService.getNearbyBuses(
          { onPress: onBusPressed },
          currentLocation
        )
      );

      setNearByPoints(
        await PointService.getNearbyPoints(
          { onPress: onPointPressed },
          currentLocation
        )
      );
    });
    directionsToNearestPoints(setNearestPointsRoutes, mapView)(dispatch);
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
        mapView.current.fitToCoordinates([currentLocation, destination], {
          edgePadding: { top: 40, bottom: 40, left: 40, right: 40 },
        });
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
                ...nearByBuses,
                routesMarker,
                busBadge,
                destinationLocation,
                ...selectedRouteMarkers,
                ...vehiclesMarkers,
              ]}
              routes={[
                ...routes,
                ...nearestPointsRoutes,
                destinationLocationRoute,
              ]}
            />
          }
          toolbar={<Toolbar unFocused={unFocusedToolbar} mapView={mapView} navigation={navigation}/>}
          bottomNavigation={
            <BottomNavigation navigationHandler={handleNavigation} />
          }
          bottomSheet={
            <BottomSheet
              navigation={navigation}
              busStop={nearByPoints}
              buses={nearByBuses}
            />
          }
        />
      </View>
      <Toast />
    </>
  );
};

export default Home;
