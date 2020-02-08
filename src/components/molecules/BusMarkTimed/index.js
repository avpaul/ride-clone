import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import BusMarkAtom from '../../atoms/BusMark';
import { pad } from '../../../helpers';
import { darkColor, primaryColor } from '../../../styles/colors';

const styles = StyleSheet.create({
  wrapper: { marginBottom: -4 },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 8
  },
  travelDurationText: {
    fontSize: 14,
    fontWeight: '700'
  }
});

const BusMarkTimed = ({ driveDuration, stationName, type }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelWrapper}>
        {driveDuration === null ? (
          <Text style={styles.travelDurationText}>To</Text>
        ) : (
          <Text style={styles.travelDurationText}>{`${pad(
            driveDuration
          )} min`}</Text>
        )}
      </View>
      <BusMarkAtom
        stationName={stationName}
        color={type === 'active' ? primaryColor : darkColor}
      />
    </View>
  );
};

BusMarkTimed.defaultProps = {
  type: 'default'
};

BusMarkTimed.propTypes = {
  stationName: PropTypes.string,
  type: PropTypes.string,
  driveDuration: PropTypes.number
};

export default BusMarkTimed;
