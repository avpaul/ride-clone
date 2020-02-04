import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
import point from "../../../assets/images/drop-off-point.png";
import activePoint from "../../../assets/images/drop-off-point-active.png";
import parking from "../../../assets/images/parking.png";
import { ACTIVE, PARKING } from "../../../constants/point";

const Point = ({ id, title, name, type, coordinate }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    switch (type) {
      case ACTIVE:
        setImage(activePoint);
        break;
      case PARKING:
        setImage(parking);
        break;
      default:
        setImage(point);
    }
  });

  return (
    <Marker
      {...{ title, description: name, image, coordinate, identifier: id }}
    />
  );
};

Point.defaultProps = {
  title: "",
  name: "",
  type: ""
};

Point.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  coordinate: PropTypes.instanceOf(Object).isRequired
};

export default Point;
