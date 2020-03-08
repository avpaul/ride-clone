import { TOGGLE_LOADER } from "../../action-types/loader";

const reducer = (state = { message: null, loading: false }, { type, payload }) => {
  switch (type) {
    case TOGGLE_LOADER:
      return {
        message: payload.message || null,
        loading: payload.loading
      };
    default:
      return state;
  }
};

export default reducer;
