import {
  LOAD_POINT_ROUTES_START,
  LOAD_POINT_ROUTES_ERROR,
  LOAD_POINT_ROUTES_SUCCESS,
  LOAD_POINT_ROUTES_CLEAR,
  SET_SELECTED_ROUTE,
  CLEAR_SELECTED_ROUTE,
} from "../../action-types/routes";

const reducer = (
  state = {
    pointRoutes: { loading: false, data: [], error: null },
    selectedPointRoute: null,
  },
  { type, payload }
) => {
  switch (type) {
    case SET_SELECTED_ROUTE:
      return {
        ...state,
        selectedPointRoute: payload,
      };
    case CLEAR_SELECTED_ROUTE:
      return {
        ...state,
        selectedPointRoute: null,
      };
    case LOAD_POINT_ROUTES_CLEAR:
      return {
        ...state,
        pointRoutes: {
          loading: false,
          data: [],
          error: null,
        },
      };
    case LOAD_POINT_ROUTES_START:
      return {
        ...state,
        pointRoutes: {
          loading: true,
          data: [],
          error: null,
          loaded: false,
        },
      };
    case LOAD_POINT_ROUTES_SUCCESS:
      return {
        ...state,
        pointRoutes: {
          loading: false,
          data: payload.foundRoutes,
          pointAdress: payload.pointAdress,
          error: null,
          loaded: true,
        },
      };
    case LOAD_POINT_ROUTES_ERROR:
      console.log("false dispatched");
      return {
        ...state,
        pointRoutes: {
          loading: false,
          data: [],
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
