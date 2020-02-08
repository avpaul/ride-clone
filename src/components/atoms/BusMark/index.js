import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import BusStationIcon from '../../../../assets/icons/bus-stop.svg';
import { darkColor } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 38
  },
  iconWrapper: { paddingBottom: 4 },
  stationName: {
    marginLeft: 8,
    marginRight: 8,
    maxWidth: 96,
    textTransform: 'capitalize'
  }
});

const BusStationMark = ({ stationName, size, color }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <BusStationIcon width={size} height={size} fill={color} />
      </View>
      <Text style={styles.stationName}>{stationName}</Text>
    </View>
  );
};

BusStationMark.defaultProps = {
  color: darkColor,
  size: 18
};

BusStationMark.propTypes = {
  stationName: PropTypes.string,
  color: PropTypes.string
};

export default BusStationMark;
