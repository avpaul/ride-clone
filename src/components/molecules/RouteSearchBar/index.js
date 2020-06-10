import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { whiteColor, touchableLight, lightDark } from '../../../styles/colors';
import ClearIcon from '../../../assets/icons/cancel.svg';
import {
  setSearchRoutes,
  clearRoutesSearch
} from '../../../redux/actions/navigation/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  searchBarWrapper: {
    position: 'relative'
  },
  searchInput: {
    minHeight: 48,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: whiteColor
  },
  cancelButton: {
    position: 'absolute',
    right: 8,
    top: 16
  }
});

const RouteSearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(undefined);
  const { allRoutes, searchingRoute } = useSelector(
    ({ navigation }) => navigation
  );

  // search helper
  const searchRoute = (keyWord, group) => {
    const result = [];
    const regex = new RegExp(`${keyWord}`, 'i');
    for (let elementIndex = 0; elementIndex < group.length; elementIndex++) {
      const element = group[elementIndex];
      if (regex.test(element.name) || regex.test(element.id)) {
        result.push(element);
      }
    }
    return result;
  };

  // event handler
  const onTextChanged = text => {
    setSearchTerm(text);
    if (text && text.trim) {
      setSearchRoutes(searchRoute(text, allRoutes))(dispatch);
    } else {
      clearRoutesSearch()(dispatch);
    }
  };

  // reset search
  const resetSearch = () => {
    setSearchTerm(undefined);
    clearRoutesSearch()(dispatch);
  };

  return (
    <View style={styles.searchBarWrapper}>
      <TextInput
        placeholder={'Search..'}
        value={searchTerm}
        onChangeText={onTextChanged}
        style={styles.searchInput}
      />
      <TouchableHighlight
        style={styles.cancelButton}
        onPress={resetSearch}
        underlayColor={touchableLight}
      >
        <ClearIcon height={16} width={16} color={lightDark} />
      </TouchableHighlight>
    </View>
  );
};

export default RouteSearchBar;
