import {
  SET_DESTINATION_ROUTE,
  CLEAR_DESTINATION_ROUTE,
} from "../../action-types/guide";

const reducer = (state = { destinationRoute: {} }, { type, payload }) => {
  switch (type) {
    case SET_DESTINATION_ROUTE:
      return {
        destinationRoute: payload,
      };
    case CLEAR_DESTINATION_ROUTE:
      return {
        destinationRoute: {},
      };
    default:
      return state;
  }
};

export default reducer;
