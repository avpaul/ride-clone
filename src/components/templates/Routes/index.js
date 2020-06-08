import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const _styles = StyleSheet.create({
  routesWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    backgroundColor: '#f4f5f9'
  },
  safe_area:{
    backgroundColor: '#000',
  }
});

const Routes = ({ toolBar, content }) => {
  return (
    <SafeAreaView style={_styles.safe_area}>
      <View>{toolBar}</View>
      <ScrollView style={_styles.routesWrapper}>{content}</ScrollView>
    </SafeAreaView>
  );
};

export default Routes;
