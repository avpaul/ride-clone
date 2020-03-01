import {
  ON_ROUTE_PREVIEW_CANCEL,
  ON_ROUTE_PREVIEW,
  SET_ROUTES,
  SET_SEARCH_ROUTES_RESULTS,
  CLEAR_SEARCH_ROUTES_RESULTS,
  SEARCH_ROUTE_ACTIVE
} from '../../action-types/navigation';

const reducer = (
  state = {
    routePreview: false,
    allRoutes: [],
    searchRoutes: [],
    searchingRoute: false
  },
  { payload, type }
) => {
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
    default:
      return state;
  }
};

export default reducer;
