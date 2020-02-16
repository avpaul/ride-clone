import { combineReducers } from "redux";
import places from "./places";
import location from "./location";
import map from "./map";
import search from "./search";

const reducers = combineReducers({ places, location, map, search });

export default reducers;
