import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import LocationToggleIcon from "../../../assets/icons/location-toggle";
import BusToggleIcon from "../../../assets/icons/bus-toggle";
import { lightDark, touchableLight, primaryColor, whiteColor } from "../../../styles/colors";
import { SEARCH_PLACEHOLDER, DESTINATION } from "../../../constants/searchBar";
import LocationService from "../../../services/location-service";
import { INPUT_FONT_SIZE } from "../../../constants/sizes";
import FadeInView from "../../atoms/Transitions/FadeInView";
import { box_shadow } from "../../../styles";
import { setAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import placesService from "../../../services/places-service";
import { BUS, LOCATION } from "../../../constants/searchBar";
import MapService from "../../../services/map-service";
import { getVehicles } from "../../../redux/actions/vehicles/vehicles";
import AlertIcon from "../../../../assets/icons/alert";

const SearchBar = ({ onPress, mapView, setToggled, navigation }) => {
  const mapService = new MapService(mapView);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState();
  const [typeToggled, setTypeToggled] = useState(LOCATION);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef();

  const { loading: loadingVehicles } = useSelector(({ vehicles }) => vehicles);

  const [debounceCallback] = useDebouncedCallback((query) => {
    placesService.getPlaceAutocomplete(query).then((data) => {
      setPredictions(data);
      setLoading(false);
    });
  }, 1000);

  const { destination } = useSelector(({ search }) => search);

  useEffect(() => {
    if (predictions)
      setAutocompletePredictions({ predictions, type: DESTINATION })(dispatch);
  }, [predictions]);

  const handleLocationSearch = (query) => {
    query && query.length > 0 && setLoading(true);
    // if (query) debounceCallback(query);
    placesService.getPlaceAutocomplete(query).then((data) => {
      setPredictions(data);
      setLoading(false);
    });
  };

  const handleVehicleSearch = (query) => {
    getVehicles(query)(dispatch);
  };

  const handleSearchChange = (query) => {
    setSearchValue(query);
    // if (typeToggled === LOCATION) return handleLocationSearch(query);
    // if (typeToggled === BUS) handleVehicleSearch(query);

    return handleLocationSearch(query);
  };

  const handleTypeChange = () => {
    setSearchValue("");

    if (typeToggled === LOCATION) {
      return setTypeToggled(BUS);
    }
    if (typeToggled === BUS) {
      setTypeToggled(LOCATION);
    }
  };

  return (
    <FadeInView style={style.container}>
      <View style={style.wrapper}>
        {/* {typeToggled === LOCATION && (
          <TouchableHighlight
            style={style.option_toggler}
            underlayColor={touchableLight}
            // onPress={handleTypeChange}
          >
            <LocationToggleIcon width={30} height={30} />
          </TouchableHighlight>
        )} */}

        {/* {typeToggled === BUS && (
          <TouchableHighlight
            style={style.option_toggler}
            underlayColor={touchableLight}
            onPress={handleTypeChange}
          >
            <BusToggleIcon width={30} height={30} />
          </TouchableHighlight>
        )} */}

        <View style={style.blue} />

        <TextInput
          ref={searchInputRef}
          style={style.search_input}
          placeholderTextColor={lightDark}
          // placeholder={SEARCH_PLACEHOLDER(typeToggled)}
          placeholder="Where to ?"
          value={searchValue}
          keyboardType={typeToggled === BUS ? "numeric" : null}
          returnKeyType="done"
          maxLength={100}
          // onTouchStart={() => setToggled(true)}
          onChangeText={handleSearchChange}
        />

        {loadingVehicles && <ActivityIndicator />}
        {loading && <ActivityIndicator style={style.loader}/>}

        <TouchableHighlight
          style={style.option_toggler}
          underlayColor={touchableLight}
          onPress={()=> navigation.navigate("Report")}
        >
          <AlertIcon width={30} height={30} />
        </TouchableHighlight>
      </View>

      <View />
    </FadeInView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    ...box_shadow,
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  blue:{
    width: 10,
    height: 10,
    // borderRadius: 10,
    backgroundColor: primaryColor,
  },
  search_input: {
    minWidth: "78%",
    maxWidth: "100%",
    marginLeft: 15,
    fontSize: INPUT_FONT_SIZE,
  },
  option_toggler: {
    paddingTop: 15,
    paddingBottom: 12,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#e0e0e0",
  },
  loader:{
    position: 'absolute',
    right: '20%',
  }
});

SearchBar.defaultProps = {};

SearchBar.propTypes = {
  mapView: PropTypes.instanceOf(Object).isRequired,
};

export default SearchBar;
