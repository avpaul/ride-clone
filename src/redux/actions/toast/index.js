import { SHOW_TOAST, HIDE_TOAST } from "../../action-types/Toast";

export const showToast = (payload) => (dispatch) =>{
  dispatch({
    type: SHOW_TOAST,
    payload,
  });}

export const hideToast = () => (dispatch) =>
  dispatch({
    type: HIDE_TOAST,
  });
