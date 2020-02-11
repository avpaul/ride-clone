import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { View, StyleSheet, TextInput, TouchableHighlight } from "react-native";
import PositionIcon from "../../../assets/icons/position";
import CurrentPositionIcon from "../../../assets/icons/current-position";
import { lightDark, touchableLight } from "../../../styles/colors";
import { SEARCH_PLACEHOLDER } from "../../../constants/searchBar";
import LocationService from "../../../services/location-service";

const SearchBar = ({ onPress, mapView }) => {
  moveToCurrentLocation = () => {
    if(Object.keys(mapView).length) LocationService.moveTocurrentLocation(mapView);
  };

  const { destination } = useSelector(({search}) => search);

  return (
    <View style={style.container}>
      <PositionIcon width={25} height={25} fill="#444" />
      <TextInput
        style={style.search_input}
        placeholderTextColor={lightDark}
        placeholder={SEARCH_PLACEHOLDER}
        value={destination}
        maxLength={0}
        onFocus={onPress}
      />
      <TouchableHighlight
        underlayColor={touchableLight}
        onPress={moveToCurrentLocation}
      >
        <CurrentPositionIcon width={25} height={25} />
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  search_input: {
    padding: 10,
    maxWidth: "70%",
    fontSize: 20
  }
});

SearchBar.defaultProps = {};

SearchBar.propTypes = {
  mapView: PropTypes.instanceOf(Object).isRequired
};

export default SearchBar;
