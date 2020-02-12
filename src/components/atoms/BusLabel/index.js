import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import BusIcon from '../../../../assets/icons/bus.svg';

const styles = StyleSheet.create({
  busLabel: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center'
  }
});

const BusLabelAtom = ({ size, label }) => {
  return (
    <View>
      <Text style={styles.busLabel}>{label}</Text>
      <BusIcon width={size} height={size} />
    </View>
  );
};

BusLabelAtom.defaultProps = {
  size: 18
};

BusLabelAtom.propTypes = {
  label: PropTypes.any,
  size: PropTypes.number
};

export default BusLabelAtom;
