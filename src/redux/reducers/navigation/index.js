import {
  ON_ROUTE_PREVIEW_CANCEL,
  ON_ROUTE_PREVIEW,
  SET_ROUTES,
  SET_SEARCH_ROUTES_RESULTS,
  CLEAR_SEARCH_ROUTES_RESULTS,
  SEARCH_ROUTE_ACTIVE,
  SHOW_BOTTOM_SHEET,
  HIDE_BOTTOM_SHEET,
  SHOW_BUSES_SHEET,
  HIDE_BUSES_SHEET,
} from "../../action-types/navigation";

const reducer = (
  state = {
    routePreview: false,
    allRoutes: [],
    searchRoutes: [],
    searchingRoute: false,
  },
  { payload, type }
) => {
  console.log({type})
  switch (type) {
    case ON_ROUTE_PREVIEW_CANCEL:
      return { ...state, routePreview: false };
    case ON_ROUTE_PREVIEW:
      return { ...state, routePreview: true };
    case SET_ROUTES:
      return { ...state, allRoutes: payload };
    case SET_SEARCH_ROUTES_RESULTS:
      return { ...state, searchRoutes: payload, searchingRoute: true };
    case CLEAR_SEARCH_ROUTES_RESULTS:
      return { ...state, searchRoutes: [], searchingRoute: false };
    case SHOW_BOTTOM_SHEET:
      return { ...state, bottomSheet: true };
    case HIDE_BOTTOM_SHEET:
      return { ...state, bottomSheet: false };
    case SHOW_BUSES_SHEET:
      return { ...state, showBusesSheet: true };
    case HIDE_BUSES_SHEET:
      return { ...state, showBusesSheet: false };
    default:
      return state;
  }
};

export default reducer;
