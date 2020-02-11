import { SET_CURRENT_LOCATION } from "../../action-types/location";

export const setCurrentLocation = payload => dispatch =>
  dispatch({
    type: SET_CURRENT_LOCATION,
    payload
  });
