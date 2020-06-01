import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
import BusIcon from "../../../../assets/icons/bus";

const Vehicle = ({ id, title, name, type, latitude, longitude, onPress }) => {
  return (
    <Marker
      {...{
        key: id,
        title,
        description: name,
        coordinate: { latitude, longitude },
        identifier: id,
        onPress
      }}
    >
      <BusIcon width={20} height={20} />
    </Marker>
  );
};

Vehicle.defaultProps = {
  title: "",
  name: "",
  type: "",
  id: "",
  onPress: () => null
};

Vehicle.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onPress: PropTypes.func
};

export default Vehicle;
