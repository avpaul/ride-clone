import React from "react";
import sortByDistance from "sort-by-distance";
import Bus from "../components/atoms/BusMarker";
import firebaseService from "./firebase-service";

export default class BusService {
  static bus(props) {
    return <Bus {...{ id: props.key, ...props }} />;
  }

  static async getBuses(props) {
    const buses = await firebaseService.getCollection("vehicles");
    return buses.map((_props) => this.bus({ ..._props, ...props }));
  }

  static async getNearbyBuses(props, currentLocation) {
    const buses = await firebaseService.getCollection("vehicles");
    const sortedBuses = currentLocation
      ? sortByDistance(currentLocation, buses, {
          yName: "latitude",
          xName: "longitude",
        })
      : [];

    return (
      sortedBuses &&
      Array.from(new Set(sortedBuses.map(JSON.stringify)))
        .map(JSON.parse)
        .slice(0, 5)
        .map((_props, index) => this.bus({ ..._props, ...props, index }))
    );
  }
}
