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

    const { data : route} = await this.axios.post(MATCHED_ROUTES, {
      currentLocation,
      destination
    }); // BEST MATCH

    const result = await this.toLatLngPoint(route);

    return result;
  }

  async toLatLngPoint(route) {
    const points = route.points ? await Promise.all(
      route.points.map(id => firebaseService.getDocument("points", String(id)))
    ) : [];

    return {
      ...route,
      points
    };
  }

  async getPointRoutes(route) {
    console.log(route)
    const nearbyRoutes = await firebaseService.getCollection("routes", {
      field: "points",
      sign: "array-contains",
      value: Number(route.id)
    });

    const nearbyRoutePointsLatLng = nearbyRoutes.map(async route =>
      await this.toLatLngPoint(route)
    );

    const result = await Promise.all(nearbyRoutePointsLatLng);

    return result;
  }
}
