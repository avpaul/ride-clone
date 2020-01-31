import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

const SampleAtom = ({count}) => {
  return (
    <View>
      <Text>Atom sample: {count}</Text>
    </View>
  );
};

SampleAtom.defaultProps = {
  count: 0,
};

SampleAtom.propTypes = {
  count: PropTypes.number,
};

export default SampleAtom;
