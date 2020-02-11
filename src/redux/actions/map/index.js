import { ON_MAP_PRESSED } from "../../action-types/map";

export const onMapPressed = payload => dispatch =>
  dispatch({
    type: ON_MAP_PRESSED,
    payload
  });
