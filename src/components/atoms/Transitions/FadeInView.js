import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

const FadeInView = ({children, style, duration}) => {
  const [fadeAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={{
        ...style,
        opacity: fadeAnim, 
      }}>
      {children}
    </Animated.View>
  );
};

FadeInView.defaultProps = {
    style: {},
    duration: 500
}

FadeInView.propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    style: PropTypes.instanceOf(Object),
    duration: PropTypes.number
}

export default FadeInView;