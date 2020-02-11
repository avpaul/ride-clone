import React from "react";
import { Provider } from "react-redux";
import Navigations from "./src/navigations";
import "./src/services/firebase-service";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}
