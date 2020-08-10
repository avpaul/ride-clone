import React from "react";
import { View, StyleSheet } from "react-native";
import ItineraryOrganism from "../../organisms/Itinerary";
import { useSelector } from "react-redux";
import distanceToFootTime from "../../../helpers/distanceToFootTime";
import formatDistance from "../../../helpers/formatDistance";
import ABDistance from "../../../helpers/ABDistance";
import distanceToBusTime from "../../../helpers/distanceToBusTime";

const RouteSchedule = ({ route }) => {
  const { currentLocation } = useSelector(({ location }) => location);

  const travelToStation = distanceToFootTime(
    formatDistance(ABDistance(currentLocation, route?.points[0]))
  ).replace(" Min", "");

  const toTravelTime = distanceToBusTime(
    formatDistance(ABDistance(route?.points[0], route?.points[route?.points.length - 1]))
  ).replace(" Min", "");

  const stations = route.name.split("-");
  return (
    <View style={styles.container}>
      <ItineraryOrganism
        itinerary={{
          from: {
            travelTime: 20,
            stationName: stations[0],
          },
          bus: route.id,
          travelToStation,
          to: {
            travelTime: toTravelTime,
            stationName: stations[stations.length - 1],
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    left: "2.5%",
    top: 65,
  },
});

export default RouteSchedule;
