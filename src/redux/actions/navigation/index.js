import {
  ON_ROUTE_PREVIEW_CANCEL,
  ON_ROUTE_PREVIEW,
  SET_ROUTES,
  SET_SEARCH_ROUTES_RESULTS,
  CLEAR_SEARCH_ROUTES_RESULTS,
  SHOW_BOTTOM_SHEET,
  HIDE_BOTTOM_SHEET,
} from "../../action-types/navigation";

export const cancelRoutePreview = (payload) => (dispatch) => {
  dispatch({
    type: ON_ROUTE_PREVIEW_CANCEL,
    payload,
  });
};

export const previewRoute = (payload) => (dispatch) => {
  dispatch({
    type: ON_ROUTE_PREVIEW,
    payload,
  });
};

export const setRoutes = (payload) => (dispatch) => {
  dispatch({
    type: SET_ROUTES,
    payload,
  });
};

export const setSearchRoutes = (payload) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_ROUTES_RESULTS,
    payload,
  });
};

export const clearRoutesSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_ROUTES_RESULTS,
  });
};

export const showBottomSheet = () => (dispatch) => {
  dispatch({
    type: SHOW_BOTTOM_SHEET,
  });
};

export const hideBottomSheet = () => (dispatch) => {
  dispatch({
    type: HIDE_BOTTOM_SHEET,
  });
};
