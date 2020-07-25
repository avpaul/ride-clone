import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import pointImage from "../../../assets/images/drop-off-point.png";
import RouteOrganism from "../../organisms/Route";
import { hideBottomSheet } from "../../../redux/actions/navigation";

const BusStopInfo = ({ navigation }) => {
  const { loading, data: routes, pointAdress } = useSelector(
    ({ routes: { pointRoutes } }) => pointRoutes
  );

  const dispatch = useDispatch();

  // navigate to the route map
  const navigateToRoute = (routeInfo) => {
    navigation.navigate("Home", { routeInfo });
    hideBottomSheet()(dispatch);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Bus Stop</Text>

      <View style={style.wrapper}>
        <Image source={pointImage} style={style.pointImage} />

        <View style={style.infoWrapper}>
          <Text style={style.textBold}>Location</Text>
          <Text style={style.text}>
            {pointAdress ? pointAdress : "Loading.."}
          </Text>
        </View>
      </View>

      {loading && (
        <View style={style.loading}>
          <Text style={style.text}>Loading bus stop routes..</Text>
          <ActivityIndicator size="small" />
        </View>
      )}
      <View style={style.infoWrapper}>
          <Text style={style.textBold}>Routes</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.scrollView}
          >
            {!loading &&
              routes.map((routeInfo) => (
                <RouteOrganism
                  key={routeInfo.key}
                  routeID={routeInfo.id}
                  pressHandler={() => navigateToRoute(routeInfo)}
                  stations={[
                    routeInfo.name.split("-")[0],
                    routeInfo.name.split("-")[1],
                  ]}
                />
              ))}
          </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
    width: "100%",
    paddingVertical: 20,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: {
    fontWeight: "300",
    fontSize: 15,
    paddingBottom: 15,
  },
  pointImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 100,
    marginRight: 20,
    marginBottom: 10,
  },
  loading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BusStopInfo;
