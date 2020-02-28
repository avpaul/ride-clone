import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
import point from "../../../assets/images/drop-off-point.png";
import activePoint from "../../../assets/images/drop-off-point-active.png";
import parking from "../../../assets/images/parking.png";
import { ACTIVE, PARKING } from "../../../constants/point";

const Point = ({ id, title, name, type, latitude, longitude }) => {
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
      {...{
        title,
        description: name,
        image,
        coordinate: { latitude, longitude },
        identifier: id
      }}
    />
  );
};

Point.defaultProps = {
  title: "",
  name: "",
  type: "",
  id:""
};

Point.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default Point;
