import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput, TouchableHighlight } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { lightDark } from "../../../styles/colors";
import { SEARCH_ORIGIN_PLACEHOLDER, ORIGIN } from "../../../constants/searchBar";
import BulletIcon from "../../../assets/icons/bullet";
import CancelIcon from "../../../assets/icons/cancel";
import placesService from "../../../services/places-service";
import { setAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicator from "../../atoms/ActivityIndicator";

const OriginSearchBar = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState();
  const [currentAddress, setCurrentAddress] = useState();

  const { currentLocation } = useSelector(({ location }) => location);
  const { origin } = useSelector(({search}) => search);

  placesService.getPlaceAddress(currentLocation).then(location => {
    setLoading(false);
    setCurrentAddress(location);
  });

  const [debounceCallback] = useDebouncedCallback(query => {
    placesService.getPlaceAutocomplete(query).then(data => {
      setPredictions(data);
      setLoading(false);
    });
  }, 1000);

  handleSearch = query => {
    setLoading(true);
    if (query) debounceCallback(query);
  };

  useEffect(() => {
    if (predictions) setAutocompletePredictions({predictions, type: ORIGIN})(dispatch);
  }, [predictions]);

  return (
    <View style={style.container}>
      <View style={style.left_container}>
        <BulletIcon width={15} height={15} />
        <TextInput
          style={style.search_input}
          placeholderTextColor={lightDark}
          placeholder={SEARCH_ORIGIN_PLACEHOLDER}
          maxLength={100}
          onChangeText={handleSearch}
          defaultValue={origin || currentAddress}
        />
      </View>

      {loading && <ActivityIndicator />}

      <TouchableHighlight underlayColor={lightDark} onPress={onCancel}>
        <CancelIcon width={20} height={20} />
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
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
  left_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%"
  },
  search_input: {
    width: "90%",
    maxWidth: "90%",
    fontSize: 20,
    marginLeft: 20
  }
});

OriginSearchBar.defaultProps = {};

OriginSearchBar.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default OriginSearchBar;
