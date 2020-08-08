import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

const _styles = StyleSheet.create({
  routesWrapper: {
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    backgroundColor: "#f4f5f9",
  },
  loading_container: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  safe_area: {
    height: '100%',
    paddingBottom: 20,
    backgroundColor: "#000",
  },
});

const Routes = ({ toolBar, content, loading }) => {
  return (
    <SafeAreaView style={_styles.safe_area}>
      <View>{toolBar}</View>
      {loading && (
        <View style={_styles.loading_container}>
          <ActivityIndicator />
        </View>
      )}
      <ScrollView style={_styles.routesWrapper}>{content}</ScrollView>
    </SafeAreaView>
  );
};

export default Routes;
