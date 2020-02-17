import {
  ON_ROUTE_PREVIEW_CANCEL,
  ON_ROUTE_PREVIEW
} from '../../action-types/navigation';

export const cancelRoutePreview = payload => dispatch => {
  dispatch({
    type: ON_ROUTE_PREVIEW_CANCEL,
    payload
  });
};

export const previewRoute = payload => dispatch => {
  dispatch({
    type: ON_ROUTE_PREVIEW,
    payload
  });
};
