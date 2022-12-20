import React, { useState } from "react";
import { BigNumber } from "ethers";

const Connection = () => {
  const connection = {};

  [connection.configured, connection.setConfigured] = useState(false);
  [connection.ethereum, connection.setEthereum] = useState(undefined);
  [connection.wallet, connection.setWallet] = useState(undefined);
  [connection.chainId, connection.setChainId] = useState(undefined);

  connection.configure = (ethereum) => {
    connection.setEthereum((old) => {
      if (!old) {
        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);
      }
      return ethereum;
    });
    connection.setConfigured(true);
  };

  connection.cleanConfiguration = () => {
    if (!connection.ethereum) {
      return;
    }
    connection.ethereum.removeListener(
      "accountsChanged",
      handleAccountsChanged
    );
    connection.ethereum.removeListener("chainChanged", handleChainChanged);
  };

  connection.connect = () => {
    connection.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => handleAccountsChanged(accounts))
      .catch((e) =>
        console.log("[ConnectionContext.handleAccountsChanged]", "error", e)
      );

    connection.ethereum
      .request({ method: "eth_chainId" })
      .then((chainId) => handleChainChanged(chainId));
  };

  connection.getBalance = async () => {
    if (!connection.ethereum || !connection.wallet) {
      return;
    }

    return BigNumber.from(
      await connection.ethereum.request({
        method: "eth_getBalance",
        params: [connection.wallet, "latest"],
      })
    );
  };

  connection.signLogin = async () => {
    try {
      const timestamp = Date.now();
      const signature = await connection.ethereum.request({
        method: "personal_sign",
        params: ["Confirm Web3 Login. Time: " + timestamp, connection.wallet],
      });

      console.log(
        "[ConnectionContext.signLogin]",
        "timestamp",
        timestamp,
        "signature",
        signature
      );

      return { timestamp, signature };
    } catch (e) {
      console.log("[ConnectionContext.signLogin]", "error", e);
    }

    return undefined;
  };

  const handleAccountsChanged = (accounts) => {
    console.log(
      "[ConnectionContext.handleAccountsChanged]",
      "wallet",
      accounts[0]
    );
    connection.setWallet(accounts[0]);
  };

  const handleChainChanged = (chainId) => {
    console.log("[ConnectionContext.handleChainChanged]", "chainId", chainId);
    connection.setChainId(chainId);
  };

  return connection;
};

export const ConnectionContext = React.createContext();

export const ConnectionProvider = (params) => {
  const connection = Connection();

  return (
    <ConnectionContext.Provider value={connection}>
      {params.children}
    </ConnectionContext.Provider>
  );
};
