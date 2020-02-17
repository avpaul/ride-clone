import {
  ON_ROUTE_PREVIEW_CANCEL,
  ON_ROUTE_PREVIEW
} from '../../action-types/navigation';

const reducer = (state = { routePreview: false }, { payload, type }) => {
  switch (type) {
    case ON_ROUTE_PREVIEW_CANCEL:
      return { ...state, routePreview: false };
    case ON_ROUTE_PREVIEW:
      return { ...state, routePreview: true };
    default:
      return state;
  }
};

export default reducer;
