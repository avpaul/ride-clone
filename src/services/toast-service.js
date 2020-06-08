import React from "react";
import { showToast } from "../redux/actions/toast";

export default class ToastService {
  static showMarkerGuideToast(Message, dispatch) {
    showToast(<Message />)(dispatch);
  }
}
