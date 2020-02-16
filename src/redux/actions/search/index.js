import { SET_SEARCH_RESULT } from "../../action-types/search";

export const setSearchSelection = payload => dispatch =>
  dispatch({
    type: SET_SEARCH_RESULT,
    payload
  });
