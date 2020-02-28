import { combineReducers } from "redux";
import places from "./places";
import location from "./location";
import map from "./map";
import search from "./search";
import guide from "./guide";

const reducers = combineReducers({ places, location, map, search, guide });

export default reducers;
