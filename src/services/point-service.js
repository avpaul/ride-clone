import React from 'react';
import Point from '../components/atoms/Point';
import firebaseService from './firebase-service';

export default class PointService {
  static point(props) {
    console.log('>>>>>>>>', props);
    return <Point {...props} />;
  }

  static async getCityPoints() {
    const cityPoints = await firebaseService.getCollection('points'); // To be fetched from the remote database
    return cityPoints.map(props => this.point(props));
  }
}
