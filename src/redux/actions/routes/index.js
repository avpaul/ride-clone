import {
  LOAD_POINT_ROUTES_START,
  LOAD_POINT_ROUTES_ERROR,
  LOAD_POINT_ROUTES_SUCCESS,
  LOAD_POINT_ROUTES_CLEAR,
  CLEAR_SELECTED_ROUTE,
  SET_SELECTED_ROUTE
} from "../../action-types/routes";
import GuideService from "../../../services/guide-service";

export const clearSelectedPointRoute = () => dispatch =>
  dispatch({
    type: CLEAR_SELECTED_ROUTE
  });

export const setSelectedPointRoute = route => dispatch =>
  dispatch({
    type: SET_SELECTED_ROUTE,
    payload: route
  });

export const clearPointRoutes = () => dispatch =>
  dispatch({
    type: LOAD_POINT_ROUTES_CLEAR
  });

export const getPointRoutes = id => async dispatch => {
  const guideService = new GuideService();
  try {
    dispatch({
      type: LOAD_POINT_ROUTES_START
    });

    const foundRoutes = await guideService.getPointRoutes({ key: id });

    dispatch({
      type: LOAD_POINT_ROUTES_SUCCESS,
      payload: foundRoutes
    });
  } catch (e) {
    dispatch({
      type: LOAD_POINT_ROUTES_ERROR,
      payload: e
    });
  }
};
