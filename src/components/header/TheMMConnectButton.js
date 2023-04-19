import React, { useEffect, useContext } from "react";

import { ConnectionContext } from "microfrontend-context";

import "./TheMMConnectButton.css";

const TheMMConnectButton = () => {
  const connection = useContext(ConnectionContext);

  const connect = () => {
    connection.connect();
  };

  const printWallet = (wallet) => {
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

  return (
    <div className="connect-button-container">
      {connection.wallet ? (
        <button className="connect-button" disabled>
          {printWallet(connection.wallet)}
        </button>
      ) : connection.configured ? (
        <button className="connect-button" onClick={connect}>
          Connect
        </button>
      ) : (
        <button className="connect-button" disabled>
          Connect
        </button>
      )}
    </div>
  );
};

export default TheMMConnectButton;
