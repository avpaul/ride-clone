import { TOGGLE_LOADER } from "../../action-types/loader";

export const toggleLoader = payload => dispatch =>
  dispatch({
    type: TOGGLE_LOADER,
    payload
  });
