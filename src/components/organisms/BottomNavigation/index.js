import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavigationButton from '../../molecules/BottomNavigationButton';
import CancelIcon from '../../../assets/icons/close-cp.svg';
import RouteIcon from '../../../assets/icons/road-sign.svg';
import { height, width } from '../../../constants/dimensions';
import { whiteColor, transparent } from '../../../styles/colors';
import { useSelector } from 'react-redux';

const _styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: height(4),
    paddingLeft: width(4),
    paddingRight: width(4)
  }
});

const BottomNavigation = ({ navigationHandler }) => {
  const previewRoute = useSelector(state => state.routePreview);

  const cancelHandler = () => {};

  const routesHandler = () => {
    navigationHandler('Routes', {});
  };

  return (
    <LinearGradient colors={[transparent, whiteColor, whiteColor]}>
      <View
        style={{
          ..._styles.wrapper,
          justifyContent: previewRoute ? 'space-between' : 'flex-end'
        }}
      >
        {previewRoute && (
          <BottomNavigationButton
            title={'Cancel'}
            Icon={CancelIcon}
            pressHandler={cancelHandler}
            label={'Cancel'}
            size={24}
          />
        )}
        <BottomNavigationButton
          title={'Routes'}
          Icon={RouteIcon}
          pressHandler={routesHandler}
          label={'Routes'}
        />
      </View>
    </LinearGradient>
  );
};

export default BottomNavigation;
