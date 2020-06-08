import React, { useState, useEffect } from 'react';
import RoutesTemplate from '../../templates/Routes';
import RouteOrganism from '../../organisms/Route/index';
import Toolbar from '../../organisms/AllRoutesToolbar';
import EmptyRoutesMolecule from '../../molecules/EmptyRoutes';
import { useDispatch, useSelector } from 'react-redux';
import RouteService from '../../../services/route-service';
import { setRoutes } from '../../../redux/actions/navigation/index';

const Routes = ({ navigation }) => {
  const routeService = new RouteService();

  const handleNavigation = (screen, props) => {
    navigation.navigate(screen, { ...props });
  };

  const dispatch = useDispatch();
  const { allRoutes, searchRoutes, searchingRoute } = useSelector(
    ({ navigation }) => navigation
  );

  // get all routes from routes service
  useEffect(() => {
    (async function fetchRoutes() {
      const routes = await routeService.getAllRoutes();
      setRoutes(routes)(dispatch);
    })();
  }, []);

  // navigate to the route map
  const navigateToRoute = routeKey => {};

  // get route components
  const routeComponents = () => {
    // when searching routes display search results
    const routes = searchingRoute ? searchRoutes : allRoutes;

    return routes.map(routeInfo => (
      <RouteOrganism
        key={routeInfo.key}
        routeID={routeInfo.id}
        pressHandler={() => navigateToRoute(routeInfo.key)}
        stations={[routeInfo.name.split('-')[0], routeInfo.name.split('-')[1]]}
      />
    ));
  };

  // get component content
  const getContent = key => {
    if (searchingRoute && !searchRoutes.length) {
      return <EmptyRoutesMolecule />;
    } else {
      return routeComponents();
    }
  };

  return (
    <RoutesTemplate
      toolBar={<Toolbar pressHandler={handleNavigation} />}
      content={getContent()}
    />
  );
};

export default Routes;
