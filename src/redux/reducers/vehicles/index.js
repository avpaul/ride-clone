import {
  GET_VEHICLES_START,
  GET_VEHICLES_ERROR,
  GET_VEHICLES_SUCCESS
} from "../../action-types/vehicles/getVehicles";

const reducer = (
  state = {
    pointRoutes: { loading: false, data: [], error: null },
    selectedPointRoute: null
  },
  { type, payload }
) => {
  switch (type) {
    case GET_VEHICLES_START:
      return {
        ...state,
        data: [],
        loading: true,
        error: null
      };
    case GET_VEHICLES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null
      };
    case GET_VEHICLES_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default reducer;
