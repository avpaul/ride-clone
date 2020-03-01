import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const _styles = StyleSheet.create({
  routesWrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8
  }
});

const Routes = ({ toolBar, content }) => {
  return (
    <SafeAreaView>
      <View>{toolBar}</View>
      <ScrollView style={_styles.routesWrapper}>{content}</ScrollView>
    </SafeAreaView>
  );
};

export default Routes;
