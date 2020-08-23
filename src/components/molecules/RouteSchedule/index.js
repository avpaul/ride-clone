import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import sortByDistance from "sort-by-distance";
import ItineraryOrganism from "../../organisms/Itinerary";
import { useSelector } from "react-redux";
import distanceToFootTime from "../../../helpers/distanceToFootTime";
import formatDistance from "../../../helpers/formatDistance";
import ABDistance from "../../../helpers/ABDistance";
import distanceToBusTime from "../../../helpers/distanceToBusTime";
import firebaseService from "../../../services/firebase-service";

const RouteSchedule = ({ route = {} }) => {
  const { currentLocation } = useSelector(({ location }) => location);
  const [bus, setBus] = useState({});

  useEffect(()=>{
    firebaseService.getCollection("vehicles", {field: 'id', sign: "==", value: String(route.id)}).then(result => {
      if(result && result.length > 0){ 
        const sortedBuses = sortByDistance(currentLocation, result, {
          yName: "latitude",
          xName: "longitude"
        });
        setBus(sortedBuses[0]);
      }
    })
  },[route]);

  const travelTime = bus.id ? distanceToFootTime(
    formatDistance(ABDistance(bus, route?.points[0]))
  ).replace(" Min", "") : '-';

  const travelToStation = distanceToFootTime(
    formatDistance(ABDistance(currentLocation, route?.points[0]))
  ).replace(" Min", "");

  const toTravelTime = distanceToBusTime(
    formatDistance(ABDistance(route?.points[0], route?.points[route?.points.length - 1]))
  ).replace(" Min", "");

  const stations = route && route.name ? route.name.split("-") : '';
  return (
    <View style={styles.container}>
      <ItineraryOrganism
        itinerary={{
          from: {
            travelTime: travelTime,
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
