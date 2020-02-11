import { ON_MAP_PRESSED } from "../../action-types/places/autocomplete";

const reducer = (state = { pressed: [] }, { type, payload }) => {
  switch (type) {
    case ON_MAP_PRESSED:
      return {
        pressed: payload
      };
    default:
      return state;
  }
};

export default reducer;
