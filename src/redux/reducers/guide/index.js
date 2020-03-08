import { SET_DESTINATION_ROUTE } from "../../action-types/guide";

const reducer = (state = { destinationRoute: {} }, { type, payload }) => {
  switch (type) {
    case SET_DESTINATION_ROUTE:
      return {
        destinationRoute: payload
      };
    default:
      return state;
  }
};

export default reducer;
