import React from "react";
import { ConnectionProvider } from "microfrontend-context";
import TheHeader from "./header/TheHeader";
import TheAssetStakePage from "./pages/TheAssetStakePage";
import "./TheStakeApp.css";
function TheStakeApp() {
  const getPage = () => {
    if (window.location.pathname == "/stake") {
      return /*#__PURE__*/React.createElement(TheAssetStakePage, null);
    }
  };
  return /*#__PURE__*/React.createElement(ConnectionProvider, null, /*#__PURE__*/React.createElement("header", {
    className: "g-header"
  }, /*#__PURE__*/React.createElement(TheHeader, null)), /*#__PURE__*/React.createElement("main", {
    className: "g-content"
  }, getPage()));
}
export default TheStakeApp;