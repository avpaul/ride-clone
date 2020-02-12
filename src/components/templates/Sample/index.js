import React from 'react';
import { View, StyleSheet } from 'react-native';
import SampleOrganism from '../../organisms/Sample';
import ItineraryOrganism from '../../organisms/Itinerary';

const styles = StyleSheet.create({});

const SampleTemplate = () => {
  const fullItinerary = {
    from: { stationName: 'down town', travelTime: 0 },
    to: { stationName: 'kicukiro sonatube', travelTime: 20 },
    bus: 218,
    travelToStation: 1
  };
  
  const transitItinerary = {
    from: { stationName: 'kuryanyuma' },
    to: { stationName: 'down town', travelTime: 12 },
    bus: 402
  };

  return (
    <View>
      <SampleOrganism />
      <ItineraryOrganism
        style={{ margin: 8 }}
        type="full"
        itinerary={fullItinerary}
      />
      <ItineraryOrganism
        style={{ margin: 8 }}
        type="transit"
        itinerary={transitItinerary}
      />
    </View>
  );
};

export default SampleTemplate;
