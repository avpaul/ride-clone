import React from "react";
import sortByDistance from "sort-by-distance";
import Point from "../components/atoms/Point";
import firebaseService from "./firebase-service";

export default class PointService {
  static point(props) {
    return <Point {...{ ...props, id: props.key }} />;
  }

  static async getCityPoints(props) {
    const cityPoints = await firebaseService.getCollection("points");
    return cityPoints.map(_props => this.point({ ..._props, ...props }));
  }

  static async getNearbyPoints(props, currentLocation) {
    const points = await firebaseService.getCollection("points");
    const sortedPoints = currentLocation
      ? sortByDistance(currentLocation, points, {
          yName: "latitude",
          xName: "longitude"
        })
      : [];

    return (
      sortedPoints &&
      Array.from(new Set(sortedPoints.map(JSON.stringify)))
        .map(JSON.parse)
        .slice(0, 5)
        .map((_props, index) => this.point({ ..._props, ...props, index }))
    );
  }
}
