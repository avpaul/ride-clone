import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { View, StyleSheet, TextInput, TouchableHighlight } from "react-native";
import PositionIcon from "../../../assets/icons/position";
import CurrentPositionIcon from "../../../assets/icons/current-position";
import { lightDark, touchableLight } from "../../../styles/colors";
import { SEARCH_PLACEHOLDER } from "../../../constants/searchBar";
import LocationService from "../../../services/location-service";
import { INPUT_FONT_SIZE } from "../../../constants/sizes";
import FadeInView from "../../atoms/Transitions/FadeInView";
import { box_shadow } from "../../../styles";

const SearchBar = ({ onPress, mapView }) => {
  moveToCurrentLocation = () => {
    LocationService.moveTocurrentLocation(mapView);
  };

  const { destination } = useSelector(({ search }) => search);

  return (
    <FadeInView style={style.container}>
      <View style={style.wrapper}>
        <PositionIcon width={22} height={22} fill="#444" />
        <TextInput
          style={style.search_input}
          placeholderTextColor={lightDark}
          placeholder={SEARCH_PLACEHOLDER}
          value={destination}
          maxLength={0}
          onFocus={onPress}
        />
      </View>
      <TouchableHighlight
        underlayColor={touchableLight}
        onPress={moveToCurrentLocation}
      >
        <CurrentPositionIcon width={22} height={22} />
      </TouchableHighlight>
    </FadeInView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 15,
    paddingRight:15,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    ...box_shadow,
  },
  wrapper:{
    flexDirection: 'row',
    alignItems:'center',
    maxWidth: "80%",
  },
  search_input: {
    padding: 10,
    maxWidth: "100%",
    marginLeft: 10,
    fontSize: INPUT_FONT_SIZE
  }
});

SearchBar.defaultProps = {};

SearchBar.propTypes = {
  mapView: PropTypes.instanceOf(Object).isRequired
};

export default SearchBar;
