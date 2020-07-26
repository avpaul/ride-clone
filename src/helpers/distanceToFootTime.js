export default (distance) => { // 84 meters per minute
    const time = distance * 1000 / 84;
    if(time > 60){
        return `${Number(time / 60).toFixed(0)} H`;
    }

    return `${time.toFixed(0)} Min`
}