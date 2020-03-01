import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
import point from "../../../assets/images/drop-off-point.png";
import activePoint from "../../../assets/images/drop-off-point-active.png";
import parking from "../../../assets/images/parking.png";
import { ACTIVE, PARKING } from "../../../constants/point";
import {
  clearPointRoutes,
  clearSelectedPointRoute
} from "../../../redux/actions/routes";
import { useDispatch } from "react-redux";

const Point = ({ id, title, name, type, latitude, longitude, onPress }) => {
  const [image, setImage] = useState();
  const dispatch = useDispatch();

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

  const handleOnPress = () => {
    clearPointRoutes()(dispatch);
    clearSelectedPointRoute()(dispatch);
    onPress({ latitude, longitude, id });
  };

  return (
    <Marker
      {...{
        title,
        description: name,
        image,
        coordinate: { latitude, longitude },
        identifier: id,
        onPress: handleOnPress
      }}
    />
  );
};

Point.defaultProps = {
  title: "",
  name: "",
  type: "",
  id: "",
  onPress: () => null
};

Point.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onPress: PropTypes.func
};

export default Point;
