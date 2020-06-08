import { SHOW_TOAST, HIDE_TOAST } from "../../action-types/Toast";

const reducer = (
  state = { message: null, loading: false },
  { type, payload }
) => {
  switch (type) {
    case SHOW_TOAST:
      return {
        show: true,
        message: payload,
      };
    case HIDE_TOAST:
      return {
        show: false,
      };
    default:
      return state;
  }
};

export default reducer;
