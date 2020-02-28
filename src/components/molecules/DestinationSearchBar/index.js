import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { lightDark } from "../../../styles/colors";
import { SEARCH_DESTINATION_PLACEHOLDER, DESTINATION } from "../../../constants/searchBar";
import BulletIcon from "../../../assets/icons/bullet";
import placesService from "../../../services/places-service";
import { setAutocompletePredictions } from "../../../redux/actions/places/autocompletePlaces";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicator from "../../atoms/ActivityIndicator";
import { INPUT_FONT_SIZE } from "../../../constants/sizes";
import { box_shadow } from "../../../styles";

const DestinationSearchBar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState();

  const { destination } = useSelector(({search}) => search);

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
    if (predictions) setAutocompletePredictions({predictions, type: DESTINATION})(dispatch);
  }, [predictions]);

  return (
    <View style={style.container}>
      <View style={style.left_container}>
        <BulletIcon width={15} height={15} />
        <TextInput
          style={style.search_input}
          placeholderTextColor={lightDark}
          placeholder={SEARCH_DESTINATION_PLACEHOLDER}
          maxLength={100}
          defaultValue={destination}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      {loading && <ActivityIndicator />}
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
    borderRadius: 5,
    ...box_shadow
  },
  left_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%"
  },
  search_input: {
    width: "90%",
    maxWidth: "90%",
    fontSize: INPUT_FONT_SIZE,
    marginLeft: 20
  }
});

DestinationSearchBar.defaultProps = {};

DestinationSearchBar.propTypes = {};

export default DestinationSearchBar;
