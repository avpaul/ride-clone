import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import EmptyRouteIcon from '../../../assets/icons/empty.svg';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    padding: 16,
    fontSize: 18
  }
});

const EmptyRoutesMolecule = ({ label = 'No routes found!' }) => {
  return (
    <View style={styles.wrapper}>
      <EmptyRouteIcon height={48} width={48} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default EmptyRoutesMolecule;
