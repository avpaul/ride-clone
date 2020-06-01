import React from "react";
import Vehicle from "../components/atoms/Vehicle";

export default class VehicleService {
  static vehicle(props) {
    return <Vehicle {...{ ...props, id: props.key }} />;
  }
}
