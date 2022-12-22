import React, { useEffect, useContext } from "react";
import { ConnectionContext } from "microfrontend-context";
import "./TheMMConnectButton.css";
const TheMMConnectButton = () => {
  const connection = useContext(ConnectionContext);
  const connect = () => {
    connection.connect();
  };
  const printWallet = wallet => {
    let _wallet = wallet.substr(0, 3);
    _wallet += "...";
    _wallet += wallet.substr(wallet.length - 3);
    return _wallet;
  };
  useEffect(() => {
    if (!connection.configured && typeof window.ethereum !== "undefined") {
      connection.configure(window.ethereum);
      return () => {
        connection.cleanConfiguration();
      };
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "connect-button-container"
  }, connection.wallet ? /*#__PURE__*/React.createElement("button", {
    className: "connect-button",
    disabled: true
  }, printWallet(connection.wallet)) : connection.configured ? /*#__PURE__*/React.createElement("button", {
    className: "connect-button",
    onClick: connect
  }, "Connect") : /*#__PURE__*/React.createElement("button", {
    className: "connect-button",
    disabled: true
  }, "Connect"));
};
export default TheMMConnectButton;