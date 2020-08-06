import React from "react";
import ListItem from "../../atoms/ListItem";

const RouteOrganism = ({ pressHandler, routeInfo, stations }) => {
  return (
    <ListItem
      {...{
        headerLeft: routeInfo.id,
        headerRight: `${stations[0]} - ${stations[1]}`,
        itemBold: `${routeInfo.price} RWF`,
        renderTitle: false,
        isBus: true,
        pressHandler
      }}
    />
  );
};

RouteOrganism.propTypes = {};

export default RouteOrganism;
