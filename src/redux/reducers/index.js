import { combineReducers } from "redux";
import places from "./places";
import location from "./location";
import map from "./map";
import search from "./search";
import guide from "./guide";
import loader from "./loader";
import routes from "./routes";

const reducers = combineReducers({
  places,
  location,
  map,
  search,
  guide,
  loader,
  routes
});

export default reducers;
