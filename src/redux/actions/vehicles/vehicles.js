import {
  GET_VEHICLES_START,
  GET_VEHICLES_ERROR,
  GET_VEHICLES_SUCCESS
} from "../../action-types/vehicles/getVehicles";
import firebaseService from "../../../services/firebase-service";

export const getVehicles = id => async dispatch => {
  dispatch({
    type: GET_VEHICLES_START
  });

  try {
    const vehicles = await firebaseService.getCollection("vehicles", {
      field: "id",
      sign: "==",
      value: id
    });

    dispatch({
      type: GET_VEHICLES_SUCCESS,
      payload: vehicles
    });
  } catch (e) {
    dispatch({
      type: GET_VEHICLES_ERROR,
      payload: e
    });
  }
};
