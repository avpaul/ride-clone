import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import PropTypes from "prop-types";
import { Marker } from "react-native-maps";
import BusImage from "../../../../assets/icons/bus-blue";
import { useDispatch } from "react-redux";
import {
  previewRoute,
  showBottomSheet,
} from "../../../redux/actions/navigation";
import { primaryColor } from "../../../styles/colors";

const Bus = ({ id, index, title, name, latitude, longitude, distance, onPress }) => {
  const dispatch = useDispatch();

  const handleOnPress = () => {
    // Shows the marker of the bus stop distance
    previewRoute()(dispatch);
    onPress({ latitude, longitude, id, distance });
  };

  useEffect(()=>{
    if(index === 0){
      handleOnPress();
    }
  }, [index]);

  return (
    <Marker
      {...{
        key: id,
        title,
        description: name,
        coordinate: { latitude, longitude },
        identifier: id,
        onPress: handleOnPress,
        zIndex: !isNaN(id) && id + 1,
      }}
    >
      <BusImage width={25} height={25}/>
    </Marker>
  );
};

Bus.defaultProps = {
  title: "",
  name: "",
  type: "",
  id: "",
  onPress: () => null,
};

Bus.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

export default Bus;
