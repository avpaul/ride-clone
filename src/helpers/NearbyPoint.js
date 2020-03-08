import ABDistance from "./ABDistance";

export default (location, points) => {
    let smallestDistance = Infinity;
    let nearbyPoint = {};

    points.map(point => {
        if(ABDistance(location, point) < smallestDistance){
            smallestDistance = ABDistance(location, point);
            nearbyPoint = point;
        }
    });

    return nearbyPoint;
}