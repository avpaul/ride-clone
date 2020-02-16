import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BusStopIcon from "../../../assets/icons/bus-stop";
import { lightDark } from "../../../styles/colors";
import { DESTINATION } from '../../../constants/searchBar';
import { setSearchSelection } from "../../../redux/actions/search";
import LocationService from "../../../services/location-service";

const PlacePredictions = ({ style, predictions, type, toggleSearchBar, mapView, onSelection }) => {
  const  dispatch = useDispatch();

  const handleSelection = () => {
    onSelection();
    toggleSearchBar();
    
    setSearchSelection({[type]:predictions[0].description})(dispatch);
    LocationService.moveTocurrentLocation(mapView);
  }

  return (
    <ScrollView
      vertical={true}
      showsVerticalScrollIndicator={false}
      style={style}
    >
      {predictions.map(({ description }, index) => (
        <TouchableOpacity underlayColor={lightDark} key={index} onPress={handleSelection}>
          <View style={_style.suggestion_container}>
            <Text style={_style.text}>{description}</Text>
            <BusStopIcon width={20} height={20} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const _style = StyleSheet.create({
  suggestion_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 6,
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
  text: {
    maxWidth: "85%",
    fontSize: 20,
    color: lightDark
  }
});

PlacePredictions.defaultProps = {
  style: null,
  predictions: [],
  type: DESTINATION,
  onSelection: () => null
};

PlacePredictions.propTypes = {
  style: PropTypes.instanceOf(Object),
  predictions: PropTypes.instanceOf(Array),
  type: PropTypes.string,
  toggleSearchBar: PropTypes.func.isRequired,
  mapView: PropTypes.instanceOf(Object).isRequired,
  onSelection: PropTypes.func
};

export default PlacePredictions;
