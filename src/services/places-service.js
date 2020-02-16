import axios from "axios";
import { GOOGLE_API_KEY, GOOGLE_API_BASEURL } from "../../env";
import { KIGALI_COORDINATES } from "../constants/coordinates";
import {
  PLACE_AUTOCOMPLETE_URL,
  PLACE_AUTOCOMPLETE_RADIUS,
  PLACE_GOECODE_URL,
  DEFAULT_COUNTRY
} from "../constants/places-service";

class PlacesService {
  constructor() {
    this.API_KEY = GOOGLE_API_KEY;
    this.location = [KIGALI_COORDINATES.latitude, KIGALI_COORDINATES.longitude];
    this.axios = axios.create({
      baseURL: GOOGLE_API_BASEURL
    });
  }

  locationString({ latitude, longitude }) {
    return `${latitude},${longitude}`;
  }

  restrictToCountry(predictions) {
    return predictions.filter(({ terms }) =>
      terms.some(
        ({ value }) => value.toLowerCase() === DEFAULT_COUNTRY.toLowerCase()
      )
    );
  }

  async getPlaceAddress(location) {
    try {
      const locationString = this.locationString({
        latitude: "-1.963833",
        longitude: "30.059793"
      });

      const {
        data: {
          results: [{ formatted_address }]
        }
      } = await this.axios.get(PLACE_GOECODE_URL, {
        params: {
          latlng: locationString,
          key: GOOGLE_API_KEY
        }
      });
      
      return formatted_address;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getPlaceLatLng(address) {
    if (!address) return;

    try {
      const {
        data: {
          results: [{ geometry: { location: { lat, lng } } = {} }] = [{}]
        }
      } = await this.axios.get(PLACE_GOECODE_URL, {
        params: {
          address,
          key: GOOGLE_API_KEY
        }
      });

      return {
        latitude: lat,
        longitude: lng
      };
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getPlaceAutocomplete(input) {
    if (!input) return;

    const locationString = this.locationString(this.location);

    try {
      const { data: { predictions } = {} } = await this.axios.get(
        PLACE_AUTOCOMPLETE_URL,
        {
          params: {
            input,
            location: locationString,
            radius: PLACE_AUTOCOMPLETE_RADIUS,
            strictbounds: null,
            key: GOOGLE_API_KEY
          }
        }
      );

      return this.restrictToCountry(predictions);
    } catch (e) {
      console.log(e);
      return;
    }
  }
}

const placesService = new PlacesService();
export default placesService;
