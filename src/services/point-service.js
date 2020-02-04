import React from 'react';
import Point from '../components/atoms/Point';

export default class PointService {
  static point(props) {
    return <Point {...props} />;
  }

  static getCityPoints() {
    const cityPoints = []; // To be fetched from the remote database
    return cityPoints.map(props => this.point(props));
  }
}
