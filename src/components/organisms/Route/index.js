import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { PropTypes } from 'prop-types';
import BusStationMark from '../../atoms/BusMark/index';
import { whiteColor, darkColor, touchableLight } from '../../../styles/colors';
import LeftRightIcon from '../../../assets/icons/transfer.svg';

const styles = StyleSheet.create({
  touchableWrapper: {
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 8
  },
  wrapper: {
    padding: 16,
    backgroundColor: whiteColor,
    shadowColor: darkColor,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8
  },
  routeName: { fontSize: 16, fontWeight: '600' },
  routesWrapper: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const RouteOrganism = ({ pressHandler, routeID, stations }) => {
  return (
    <TouchableHighlight
      onPress={pressHandler}
      underlayColor={touchableLight}
      style={styles.touchableWrapper}
    >
      <View style={styles.wrapper}>
        <Text style={styles.routeName}>{`Route ${routeID}`}</Text>
        <View style={styles.routesWrapper}>
          <BusStationMark
            stationName={stations[0]}
            direction={'column'}
            size={24}
            textSize={16}
            align={'flex-start'}
          />
          <LeftRightIcon height={24} width={24} fill={darkColor} />
          <BusStationMark
            stationName={stations[1]}
            direction={'column'}
            size={24}
            textSize={16}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

RouteOrganism.propTypes = {};

export default RouteOrganism;
