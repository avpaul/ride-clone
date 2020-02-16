import React, { useState } from "react";
import { View } from "react-native";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import Toolbar from "../../organisms/Toolbar";

const Home = () => {
  const [mapView, setMapView] = useState({});
  const [unFocusedToolbar, setUnFocusedToolbar] = useState(false);

  const handleMapPress = () => {
    setUnFocusedToolbar(true);
  };

  const handleSetMapView = mapRef => {
    setMapView(mapRef)
  }

  return (
    <View>
      <HomeTemplate
        mapView={<MapView mapRef={handleSetMapView} onPress={handleMapPress} />}
        toolbar={<Toolbar unFocused={unFocusedToolbar} mapView={mapView}/>}
      />
    </View>
  );
};

export default Home;
