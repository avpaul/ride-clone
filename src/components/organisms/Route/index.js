import React from "react";
import ListItem from "../../atoms/ListItem";

const RouteOrganism = ({ pressHandler, routeInfo, stations }) => {
  return (
    <ListItem
      {...{
        headerLeft: routeInfo.id,
        headerRight: stations,
        itemBold: `${routeInfo.price} RWF`,
        itemTitle: 'Trip price',
        renderTitle: true,
        isBus: true,
        pressHandler
      }}
    />
  );
};

RouteOrganism.propTypes = {};

export default RouteOrganism;
