import { Dimensions } from 'react-native';

export const FULL_WIDTH = Dimensions.get('window').width;
export const FULL_HEIGHT = Dimensions.get('window').height;

export const width = (percent = 100) =>  (percent * FULL_WIDTH) / 100;
export const height = (percent = 100) =>  (percent * FULL_HEIGHT) / 100;
