import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import Toolbar from "../../organisms/Toolbar";
import PointService from "../../../services/point-service";
import { useSelector } from "react-redux";
import RouteService from "../../../services/route-service";
import placesService from "../../../services/places-service";
import { Marker } from "react-native-maps";
import GuideService from "../../../services/guide-service";
import Point from "../../atoms/Point";
import { ACTIVE } from "../../../constants/point";
import BottomNavigation from '../../organisms/BottomNavigation';

const Home = () => {
  const routeService = new RouteService();
  const guideService = new GuideService();

  const [routes, setRoutes] = useState([]);
  const [mapView, setMapView] = useState({});
  const [unFocusedToolbar, setUnFocusedToolbar] = useState(false);
  const [cityPoints, setCityPoints] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState();
  const [destinationPoint, setDestinationPoint] = useState();

  const handleMapPress = () => {
    setUnFocusedToolbar(true);
  };

  const handleSetMapView = mapRef => {
    setMapView(mapRef);
  };

  const handleNavigation = (screen, props) => {
    navigation.navigate(screen,{...props});
  };

  const onMapReady = async () => {
    setCityPoints(await PointService.getCityPoints());
  };

  const { destinationRoute = {} } = useSelector(({ guide }) => guide);

  const {
    points: [origin, ...waypoints] = [],
    name: routeName
  } = destinationRoute;

  useEffect(() => {
    if (origin)
      setRoutes(
        routeService.addRoute({
          id: routeName,
          origin,
          waypoints,
          destination: waypoints.pop()
        })
      );
  }, [destinationRoute]);

  const { destination: destinationAddress } = useSelector(
    ({ search }) => search
  );

  useEffect(() => {
    const showDestinationMarker = async () => {
      if (destinationAddress) {
        const destination = await placesService.getPlaceLatLng(
          destinationAddress
        );
        setDestinationLocation(<Marker coordinate={destination} />);
      }
    };
    showDestinationMarker();
  }, [destinationAddress]);

  useEffect(() => {
    const showDestinationLocation = async () => {
      if (destinationLocation) {
        const destinationPointLocation = await guideService.getClosestPointToDestination(
          destinationLocation
        );
        setDestinationPoint(<Point coordinate={destinationPointLocation} type={ACTIVE}/>);
      }
    };
    showDestinationLocation();
  }, [destinationLocation]);

  return (
    <View>
      <HomeTemplate
        mapView={
          <MapView
            mapRef={handleSetMapView}
            onPress={handleMapPress}
            onMapReady={onMapReady}
            markers={[...cityPoints, destinationLocation, destinationPoint]}
            routes={routes}
          />
        }
        toolbar={<Toolbar unFocused={unFocusedToolbar} mapView={mapView} />}
        bottomNavigation={<BottomNavigation navigationHandler={handleNavigation}/>}
      />
    </View>
  );
};

export default Home;
