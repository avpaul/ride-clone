import LocationService from "./location-service";
import { INITIAL_HEADING, INITIAL_ZOOM } from "../constants/map";

export default class MapService {
  constructor(mapView) {
    this.mapView = mapView;
  }

  moveTocurrentLocation(heading = INITIAL_HEADING, zoom = INITIAL_ZOOM) {
    LocationService.getCurrentLocation().then(
      ({
        location: {
          latitude = KIGALI_COORDINATES.latitude,
          longitude = KIGALI_COORDINATES.longitude
        } = {}
      }) => {
        this.mapView.animateCamera({
          center: {
            latitude,
            longitude
          },
          heading,
          zoom
        });
      }
    );
  }

  moveToLocation(
    { latitude, longitude },
    heading = INITIAL_HEADING,
    zoom = INITIAL_ZOOM
  ) {
    this.mapView.animateCamera({
      center: {
        latitude,
        longitude
      },
      heading,
      zoom
    });
  }
}
