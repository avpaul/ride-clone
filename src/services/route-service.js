import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {
  ROUTE_ID_IS_REQUIRED,
  DRIVING,
  ROUTE_STROKE_WIDTH,
  ROUTE_STROKE_COLOR
} from '../constants/route-service';
import { GOOGLE_DIRECTION_API_KEY } from '../../env';
import firebaseService from './firebase-service';

class RouteService {
  constructor() {
    this._routes = [];
  }

  toRouteComponent({ origin, waypoints = [], destination, type }) {
    return (
      <MapViewDirections
        origin={origin}
        waypoints={waypoints}
        destination={destination}
        mode={DRIVING}
        optimizeWaypoints
        splitWaypoints
        strokeWidth={ROUTE_STROKE_WIDTH}
        strokeColor={ROUTE_STROKE_COLOR(type)}
        apikey={GOOGLE_DIRECTION_API_KEY}
      />
    );
  }

  get routes() {
    return firebaseService
      .getCollection('routes')
      .then(routes => {
        // console.log(routes);
        return routes;
        // don't understand the mapping
        // (the route object from firebase doesn't have these properties and the _routes array is empty)
        // return this._routes.map(route => this.toRouteComponent(route));
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRouteById(routeId) {
    return this.toRouteComponent(this._routes.find(({ id }) => id === routeId));
  }

  addRoute(route) {
    if (!route.id) return !!console.error(ROUTE_ID_IS_REQUIRED);

    this._routes.push(route);
    return this.routes;
  }

  updateRoute(routeId, object) {
    const routeIndex = this._routes.findIndex(({ id }) => id === routeId);
    if (routeIndex === null) return null;

    this._routes[routeId] = {
      ...this._routes[routeIndex],
      ...object
    };

    return this.getRouteById(routeId);
  }

  addRoutes(routes) {
    routes.map(route => this.addRoute(route));
    return this.routes;
  }

  removeRoute(routeId) {
    this._routes = this._routes.filter(({ id }) => id !== routeId);
    return this.routes;
  }

  removeRoutes(routesIds) {
    this._routes = this._routes.filter(({ id }) => !routesIds.includes(id));
    return this.routes;
  }
}

const routeService = new RouteService();
export default routeService;
