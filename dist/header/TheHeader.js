import React from "react";
import TheMMConnectButton from "./TheMMConnectButton";
import "./TheHeader.css";
const TheHeader = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "header-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-logo header-cell"
  }, "MINT"), /*#__PURE__*/React.createElement("div", {
    className: "header-cell"
  }, /*#__PURE__*/React.createElement(TheMMConnectButton, null)));
};
export default TheHeader;