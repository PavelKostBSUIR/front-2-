import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RootStore from "./store";
import AuthNavbar from "./component/authNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import UnauthNavbar from "./component/unauthNavbar";
import Login from "./component/login";
import UserField from "./component/userField";
const store = RootStore.create({});
export const StoreContext = createContext(store);
ReactDOM.render(
  <StoreContext.Provider value={store}>{<App />}</StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
