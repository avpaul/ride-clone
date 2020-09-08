import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { pad } from '../../../helpers';

const styles = StyleSheet.create({
  wrapper:{
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#555',
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  label: { fontWeight: '700', fontSize: 14 },
  labelCaption: { fontSize: 12 },
  minutesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
    marginBottom: -8
  },
  minutesText: {
    fontSize: 30,
    fontWeight: '700'
  },
  minutesTextLabel: {
    fontWeight: '700',
    fontSize: 12
  }
});

const BusArrivalAtom = ({ minutes, label }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelWrapper}>
        {label ? (
          <View>
            <Text style={styles.label}>Bus {label}</Text>
            <Text style={styles.labelCaption}>&nbsp;arrives in</Text>
          </View>
        ) : (
          <Text style={styles.label}>In</Text>
        )}
      </View>
      <View style={styles.minutesWrapper}>
        <Text style={styles.minutesText}>{pad(minutes) !== 'NaN' ? pad(minutes) : ''}</Text>
        <Text style={styles.minutesTextLabel}>&nbsp;min</Text>
      </View>
    </View>
  );
};

BusArrivalAtom.propTypes = {
  minutes: PropTypes.number,
  label: PropTypes.any
};

export default BusArrivalAtom;
