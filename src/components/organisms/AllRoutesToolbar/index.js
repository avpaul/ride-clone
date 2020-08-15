import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import SearchBar from "../../molecules/SearchBar";
import { darkColor, whiteColor, yellowColor } from "../../../styles/colors";
import LeftArrowIcon from "../../../assets/icons/left-arrow.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import RouteSearchBar from "../../molecules/RouteSearchBar";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 64,
    padding: 16,
    backgroundColor: darkColor,
  },
  toolbarHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolBarHeader: {
    display: "flex",
    flexDirection: "row",
  },
  toolbarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: whiteColor,
  },
  backButton: {
    marginRight: 12,
  },
  searchBox: {},
};

const Toolbar = ({ unFocused, onSelection, pressHandler }) => {
  const [toggled, setToggled] = useState(false);
  const {
    autocompletePredictions: { predictions, type },
  } = useSelector(({ places }) => places);

  const handleBack = () => {
    if (toggled) {
      return setToggled(false);
    }

    pressHandler("Home");
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.toolbarHeaderWrapper,
          marginBottom: toggled ? 12 : 0,
        }}
      >
        <View style={styles.toolbarHeaderWrapper}>
          <TouchableHighlight onPress={handleBack} style={styles.backButton}>
            <LeftArrowIcon height={24} width={24} fill={whiteColor} />
          </TouchableHighlight>
          <Text style={styles.toolbarTitle}>All Routes</Text>
        </View>
        <TouchableHighlight onPress={() => setToggled(!toggled)}>
          <SearchIcon height={24} width={24} fill={whiteColor} />
        </TouchableHighlight>
      </View>
      {toggled && (
        <View styles={styles.searchBox}>
          <RouteSearchBar />
        </View>
      )}
    </View>
  );
};

Toolbar.defaultProps = {
  style: null,
  onSelection: () => null,
};

Toolbar.propTypes = {
  style: PropTypes.instanceOf(Object),
};

export default Toolbar;
