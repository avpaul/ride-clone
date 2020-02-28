import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ANDROID } from "../constants/os";
import {
  NOT_AVAILABLE_ON_EMULATOR,
  PERMISSION_DENIED,
  GRANTED
} from "../constants/location-service";
import { INITIAL_ZOOM, INITIAL_HEADING } from "../constants/map";
import { KIGALI_COORDINATES } from "../constants/coordinates";

export default class LocationService {
  static async locationPremissionGranted() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === GRANTED) {
      return true;
    }
    return false;
  }

  static async getCurrentLocation() {
    let message;
    let location;

    if (Platform.OS === ANDROID && !Constants.isDevice) {
      message = NOT_AVAILABLE_ON_EMULATOR;
    }

    const permissionGranted = await LocationService.locationPremissionGranted();
    if (!permissionGranted) {
      return {
        message: PERMISSION_DENIED,
        location
      };
    }

    location = await Location.getCurrentPositionAsync({});
    return {
      message,
      location
    };
  }

  static moveTocurrentLocation(
    { current: mapView },
    heading = INITIAL_HEADING,
    zoom = INITIAL_ZOOM
  ) {
    LocationService.getCurrentLocation().then(
      ({
        location: {
          coords: {
            latitude = KIGALI_COORDINATES.latitude,
            longitude = KIGALI_COORDINATES.longitude
          } = {}
        } = {}
      }) => {
        mapView.animateCamera({
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
}
