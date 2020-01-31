import React from 'react';
import {View} from 'react-native';
import SampleAtom from '../../atoms/Sample';

const SampleMolecule = () => {
  return (
    <View>
      <SampleAtom count={1} />
    </View>
  );
};

export default SampleMolecule;
