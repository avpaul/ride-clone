import React from "react";
import sortByDistance from "sort-by-distance";
import Bus from "../components/atoms/BusMarker";
import firebaseService from "./firebase-service";
import Axios from "axios";
import { PASCAL_BASE_URL, PASCAL_API_KEY } from "../../env";

export default class BusService {
  static bus(props) {
    return <Bus {...{ id: props.key, ...props }} />;
  }

  static async getBuses(props) {
    const buses = await firebaseService.getCollection("vehicles");
    return buses.map((_props) => this.bus({ ..._props, ...props }));
  }

  // static async getNearbyBuses(props, currentLocation) {
  //   const buses = await Axios.create({
  //     headers:{'x-access-token':PASCAL_API_KEY}
  //   }).get(PASCAL_BASE_URL)

  //   console.log(buses.data.items === true);

  //   // if(!buses.data.items){
  //   //   return []
  //   // }

  //   const sortedBuses = buses.data.items
  //   .map(({location:{lat:latitude, lon:longitude} = {}, active}) => ({latitude, longitude, id:'201', active}))
  //   .filter(({active}) =>active);
  //   console.log(sortedBuses, "Found");

  //   return sortedBuses
  //     .map((_props, index) => this.bus({ ..._props, ...props, index }));
  // }

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
