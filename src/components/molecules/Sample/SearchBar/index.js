import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const SearchBar = () => {
  return (
    <View style={style.container}>
      <Text>I</Text>
      <TextInput placeholder="Where are you going ?" />
      <Text>I</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff"
  }
});

SearchBar.defaultProps = {};

SearchBar.propTypes = {};

export default SearchBar;
