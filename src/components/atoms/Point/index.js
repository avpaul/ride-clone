import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, Easing } from 'react-native'; 
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
import { previewRoute } from "../../../redux/actions/navigation";
import { primaryColor } from "../../../styles/colors";

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

  const spinValue = new Animated.Value(0);
  const [stopAnimattion, setStopAnimation] = useState(false);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
       toValue: 1,
       duration: 1000,
       easing: Easing.linear,
       useNativeDriver: true
      }
    )
   ).start();

  useEffect(()=>{
    setTimeout(()=>{
     setStopAnimation(true);
    }, 5000);
  },[]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const handleOnPress = () => {
    previewRoute()(dispatch);
    clearPointRoutes()(dispatch);
    clearSelectedPointRoute()(dispatch);
    onPress({ latitude, longitude, id });
  };

  return (
    <Marker
      {...{
        key:id,
        title,
        image,
        description: name,
        coordinate: { latitude, longitude },
        identifier: id,
        onPress: handleOnPress
      }}
    >
      {/* {!stopAnimattion && <Animated.View style={{...style.animatedCircle, transform: [{rotate: spin}]}}/>} */}
    </Marker>
  );
};

const style = StyleSheet.create({
  animatedCircle:{
    marginTop:8,
    marginLeft:0,
    width: 35,
    height: 35,
    borderRadius: 20,
    borderRightWidth: 1,
    borderColor: primaryColor,
  }
});

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
