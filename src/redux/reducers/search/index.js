import { SET_SEARCH_RESULT } from "../../action-types/search";

const reducer = (
  state = { origin: null, destination: null },
  { type, payload }
) => {
  switch (type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default reducer;
