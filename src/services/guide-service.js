import axios from "axios";
import firebaseService from "./firebase-service";
import placesService from "./places-service";
import { RIDE_API_BASEURL } from "../../env";
import { NEARBY_ROUTE, MATCHED_ROUTES } from "../constants/guide-service";

export default class GuideService {
  constructor() {
    this.axios = axios.create({
      baseURL: RIDE_API_BASEURL
    });
  }

  async getClosestPointToDestination(location) {
    const { data: nearbyLocation } = await this.axios.post(NEARBY_ROUTE, {
      location
    });

    return nearbyLocation;
  }

  async getRouteWithDestinationNearbyPoint(
    destinationAddress,
    currentLocation
  ) {
    const destination = await placesService.getPlaceLatLng(destinationAddress);

    const { key: originKey } = await this.getClosestPointToDestination(
      destination
    ); // Should return an array of points for more suggestions

    const { key: destinationKey } = await this.getClosestPointToDestination(
      currentLocation
    ); // Should return an array of points for more suggestions

    // GET ALL ROUTES FROM DESTINATION AND ROUTES FROM ORIGIN
    // const originRoute = await this.getPointRoutes(nearbyOriginPoint);
    // const destinationRoute = await this.getPointRoutes(
    //   nearbyDestinationPoint
    // );

    const {
      data: {
        routes: [route = {}]
      }
    } = await this.axios.post(MATCHED_ROUTES, {
      originKey,
      destinationKey
    }); // BEST MATCH

    const result = await this.toLatLngPoint(route);

    return result;
  }

  async toLatLngPoint(route) {
    const points = route.points ? await Promise.all(
      route.points.map(key => firebaseService.getDocument("points", key))
    ) : [];

    return {
      ...route,
      points
    };
  }

  async getPointRoutes(route) {
    const nearbyRoutes = await firebaseService.getCollection("routes", {
      field: "points",
      sign: "array-contains",
      value: route.key
    });

    const nearbyRoutePointsLatLng = nearbyRoutes.map(async route =>
      await this.toLatLngPoint(route)
    );

    const result = await Promise.all(nearbyRoutePointsLatLng);

    return result;
  }
}