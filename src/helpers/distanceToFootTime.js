export default (distance, nearByPoint) => { // 84 meters per minute
    let time = distance * 1000 / 84;

    if(nearByPoint){
        time = Math.abs(time - nearByPoint.props.distance);
    }

    if(time > 60){
        return `${Number(time / 60).toFixed(0)} H`;
    }

    return `${time.toFixed(0)} Min`
}