import {
  SET_DESTINATION_ROUTE,
  CLEAR_DESTINATION_ROUTE,
} from "../../action-types/guide";

export const setDestinationRoute = (payload) => (dispatch) =>
  dispatch({
    type: SET_DESTINATION_ROUTE,
    payload,
  });

export const clearDestinationRoute = () => (dispatch) =>
  dispatch({
    type: CLEAR_DESTINATION_ROUTE,
  });
