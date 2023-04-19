import React from "react";
import { ConnectionProvider } from "microfrontend-context";
import TheHeader from "./header/TheHeader";
import TheAssetMintPage from "./pages/TheAssetMintPage";
import "./TheMintApp.css";
function TheMintApp() {
  const getPage = () => {
    if (window.location.pathname == "/mint") {
      return /*#__PURE__*/React.createElement(TheAssetMintPage, null);
    }
  };
  return /*#__PURE__*/React.createElement(ConnectionProvider, null, /*#__PURE__*/React.createElement("header", {
    className: "g-header"
  }, /*#__PURE__*/React.createElement(TheHeader, null)), /*#__PURE__*/React.createElement("main", {
    className: "g-content"
  }, getPage()));
}
export default TheMintApp;