import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import { lightDark } from '../../../styles/colors';

const ActivityIndicatorWrapper = ({size, color}) => {
  return <ActivityIndicator size={ size || "small"} color={ color || lightDark} />;
};

ActivityIndicatorWrapper.defaultProps = {
  style: null,
  size:null,
  color:null,
};

ActivityIndicatorWrapper.propTypes = {
  style: PropTypes.instanceOf(Object),
  size: PropTypes.string,
  color: PropTypes.string
};

export default ActivityIndicatorWrapper;
