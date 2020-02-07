import React from "react";
import { View } from "react-native";
import MapView from "../../atoms/MapView";
import HomeTemplate from "../../templates/Home";
import SearchBar from "../../molecules/Sample/SearchBar";

const Home = () => {
  return (
    <View>
      <HomeTemplate mapView={<MapView />} toolbar={<SearchBar />} />
    </View>
  );
};

export default Home;
