import { SET_CURRENT_LOCATION } from "../../action-types/location";

const reducer = (state = { currentLocation: {} }, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_LOCATION:
      return {
        currentLocation: payload
      };
    default:
      return state;
  }
};

export default reducer;
