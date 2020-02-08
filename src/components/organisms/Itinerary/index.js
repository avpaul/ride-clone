import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import BusMarkTimed from '../../molecules/BusMarkTimed';
import BusLabelAtom from '../../atoms/BusLabel';
import BusArrivalAtom from '../../atoms/BusArrival';
import ChevronIcon from '../../../../assets/icons/chevron.svg';
import ManWalkingIcon from '../../../../assets/icons/man-walking.svg';
import { whiteColor } from '../../../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: whiteColor,
    borderRadius: 8
  },
  iconWrapper: {
    padding: 0
  }
});

const ItineraryOrganism = ({ style, type, itinerary }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      {type === 'full' ? (
        <>
          <BusArrivalAtom
            minutes={itinerary.from.travelTime}
            label={itinerary.bus}
          />
          <View style={styles.iconWrapper}>
            <ManWalkingIcon height={24} width={24} />
          </View>
          <View style={styles.iconWrapper}>
            <ChevronIcon height={10} width={10} />
          </View>
          <BusMarkTimed
            driveDuration={itinerary.travelToStation}
            stationName={itinerary.from.stationName}
          />
          <View style={styles.iconWrapper}>
            <ChevronIcon height={10} width={10} />
          </View>
          <BusMarkTimed
            driveDuration={itinerary.to.travelTime}
            stationName={itinerary.to.stationName}
            type="active"
          />
        </>
      ) : (
        <>
          <BusLabelAtom label={itinerary.bus} size={32} />
          <View style={styles.iconWrapper}>
            <ChevronIcon height={10} width={10} />
          </View>
          <BusMarkTimed
            driveDuration={null}
            stationName={itinerary.to.stationName}
            type="active"
          />
          <View style={styles.iconWrapper}>
            <ChevronIcon height={10} width={10} />
          </View>
          <BusArrivalAtom minutes={itinerary.to.travelTime} label={null} />
        </>
      )}
    </View>
  );
};

ItineraryOrganism.defaultProps = {
  type: 'full',
  size: 18
};

ItineraryOrganism.propTypes = {
  stationName: PropTypes.string,
  type: PropTypes.string
};

export default ItineraryOrganism;
