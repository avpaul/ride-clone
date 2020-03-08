import { SET_AUTOCOMPLETE_PREDICTION, CLEAR_AUTOCOMPLETE_PREDICTION } from "../../action-types/places/autocomplete";

const reducer = (state = { autocompletePredictions: [] }, { type, payload }) => {
  switch (type) {
    case SET_AUTOCOMPLETE_PREDICTION:
      return {
        autocompletePredictions: payload
      };
      case CLEAR_AUTOCOMPLETE_PREDICTION:
        return {
          autocompletePredictions: []
        };
    default:
      return state;
  }
};

export default reducer;
