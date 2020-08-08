import React, { useState, useEffect } from "react";
import RoutesTemplate from "../../templates/Routes";
import RouteOrganism from "../../organisms/Route/index";
import Toolbar from "../../organisms/AllRoutesToolbar";
import EmptyRoutesMolecule from "../../molecules/EmptyRoutes";
import { useDispatch, useSelector } from "react-redux";
import RouteService from "../../../services/route-service";
import { setRoutes } from "../../../redux/actions/navigation/index";

const Routes = ({ navigation }) => {
  const routeService = new RouteService();
  const [loading, setLoading] = useState();

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
      setLoading(true);

      const routes = await routeService.getAllRoutes();
      setRoutes(routes)(dispatch);

      setLoading(false);
    })();
  }, []);

  // navigate to the route map
  const navigateToRoute = (routeInfo) => {
    navigation.navigate("Home", { routeInfo });
  };

  // get route components
  const routeComponents = () => {
    // when searching routes display search results
    const routes = searchingRoute ? searchRoutes : allRoutes;

    return routes.map((routeInfo) => (
      <RouteOrganism
        key={routeInfo.key}
        routeInfo={routeInfo}
        pressHandler={() => navigateToRoute(routeInfo)}
        stations={routeInfo.name}
      />
    ));
  };

  // get component content
  const getContent = (key) => {
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
      loading={loading}
    />
  );
};

export default Routes;
