import React, { useState } from "react";
import { View } from "react-native";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import Toolbar from "../../organisms/Toolbar";
import BottomNavigation from '../../organisms/BottomNavigation';

const Home = ({navigation}) => {
  const [mapView, setMapView] = useState({});
  const [unFocusedToolbar, setUnFocusedToolbar] = useState(false);

  const handleMapPress = () => {
    setUnFocusedToolbar(true);
  };

  const handleSetMapView = mapRef => {
    setMapView(mapRef);
  };

  const handleNavigation = (screen, props) => {
    navigation.navigate(screen,{...props});
  };

  return (
    <View>
      <HomeTemplate
        mapView={<MapView mapRef={handleSetMapView} onPress={handleMapPress} />}
        toolbar={<Toolbar unFocused={unFocusedToolbar} mapView={mapView}/>}
        bottomNavigation={<BottomNavigation navigationHandler={handleNavigation}/>}
      />
    </View>
  );
};

export default Home;
