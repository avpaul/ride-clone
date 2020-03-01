import {
  SET_AUTOCOMPLETE_PREDICTION,
  CLEAR_AUTOCOMPLETE_PREDICTION
} from "../../action-types/places/autocomplete";

export const setAutocompletePredictions = payload => dispatch =>
  dispatch({
    type: SET_AUTOCOMPLETE_PREDICTION,
    payload
  });

export const clearAutocompletePredictions = () => dispatch =>
  dispatch({
    type: CLEAR_AUTOCOMPLETE_PREDICTION
  });
