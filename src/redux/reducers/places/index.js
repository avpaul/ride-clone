import { SET_AUTOCOMPLETE_PREDICTION } from "../../action-types/places/autocomplete";

const reducer = (state = { autocompletePredictions: [] }, { type, payload }) => {
  switch (type) {
    case SET_AUTOCOMPLETE_PREDICTION:
      return {
        autocompletePredictions: payload
      };
    default:
      return state;
  }
};

export default reducer;
