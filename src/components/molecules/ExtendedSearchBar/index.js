import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import OriginSearchBar from "../../molecules/OriginSearchBar";
import DestinationSearchBar from "../../molecules/DestinationSearchBar";
import { primaryColor } from "../../../styles/colors";

const ExtendedSearchBar = ({ style, setToggled }) => {
  return (
    <View style={{ ...style, ..._style.container }}>
      <OriginSearchBar onCancel={() => setToggled(false)} />

      <View style={_style.separator} />

      <DestinationSearchBar />

      <View style={_style.connector} />
    </View>
  );
};

const _style = StyleSheet.create({
  separator: {
    height: 15
  },
  connector: {
    position: "absolute",
    top:20,
    left: 26.8,
    width: 1,
    height: 80,
    backgroundColor: primaryColor
  }
});

ExtendedSearchBar.defaultProps = {
  style: null,
  setToggled: PropTypes.func.isRequired
};

ExtendedSearchBar.propTypes = {
  style: PropTypes.instanceOf(Object)
};

export default ExtendedSearchBar;