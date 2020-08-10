import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BusStopIcon from "../../../assets/icons/bus-stop";
import { lightDark } from "../../../styles/colors";
import { DESTINATION, ORIGIN } from "../../../constants/searchBar";
import { setSearchSelection } from "../../../redux/actions/search";
import { box_shadow } from "../../../styles";
import GuideService from "../../../services/guide-service";
import { setDestinationRoute } from "../../../redux/actions/guide";
import { clearAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import placesService from "../../../services/places-service";
import MapService from "../../../services/map-service";
import { toggleLoader } from "../../../redux/actions/loader";
import {
  LOADING_NEAREST_ROUTE,
  LOADING_ROUTE,
} from "../../../constants/loader";
import { previewRoute } from "../../../redux/actions/navigation";

const PlacePredictions = ({
  style,
  predictions,
  type,
  toggleSearchBar,
  mapView,
  onSelection,
}) => {
  const dispatch = useDispatch();
  const guideService = new GuideService();
  const mapService = new MapService(mapView);

  const { currentLocation = {} } = useSelector(({ location }) => location);
  const location = useSelector(({ location }) => location);

  const handleSelection = async (index) => {
    clearAutocompletePredictions()(dispatch);

    onSelection();
    toggleSearchBar();

    const address = predictions[index].description;
    setSearchSelection({ [type]: address })(dispatch);

    const addressLocation = await placesService.getPlaceLatLng(address);
    mapService.moveToLocation(addressLocation);

    // handleDestination(address); TOBE: Used in the future to get route suggestions
  };

  const handleDestination = async (destinationAddress) => {
    // if (type === DESTINATION) {
    toggleLoader({ message: LOADING_ROUTE, loading: true })(dispatch);
    clearAutocompletePredictions()(dispatch);

    // const addressLocation = await placesService.getPlaceLatLng(address);
    setSearchSelection({ destination: destinationAddress })(dispatch);

    const destinationRoute = await guideService.getRouteWithDestinationNearbyPoint(
      destinationAddress,
      currentLocation
    );

    toggleLoader({ message: LOADING_ROUTE, loading: false })(dispatch);

    setDestinationRoute(destinationRoute)(dispatch);
    previewRoute()(dispatch);
    // }
  };

  return (
    <ScrollView
      vertical={true}
      showsVerticalScrollIndicator={false}
      style={style}
    >
      {predictions.map((item, index) => (
        <TouchableOpacity
          underlayColor={lightDark}
          key={index}
          // onPress={() => handleSelection(index)}
          onPress={() => handleDestination(item.description)}
        >
          <View style={_style.suggestion_container}>
            <Text style={_style.text}>{item.description}</Text>
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
    borderRadius: 5,
    ...box_shadow,
  },
  text: {
    maxWidth: "85%",
    fontSize: 16,
    color: lightDark,
  },
});

PlacePredictions.defaultProps = {
  style: null,
  predictions: [],
  type: DESTINATION,
  onSelection: () => null,
};

PlacePredictions.propTypes = {
  style: PropTypes.instanceOf(Object),
  predictions: PropTypes.instanceOf(Array),
  type: PropTypes.string,
  toggleSearchBar: PropTypes.func.isRequired,
  mapView: PropTypes.instanceOf(Object).isRequired,
  onSelection: PropTypes.func,
};

export default PlacePredictions;
