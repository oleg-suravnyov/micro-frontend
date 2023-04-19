import React, { useState } from "react";
import { ethers } from "ethers";
import assetABI from "./abi/asset-abi";

const Asset = (address) => {
  const asset = {};

  asset.address = address;
  asset.defaultCurrency = 0;

  [asset.contract, asset.setContract] = useState(undefined);
  [asset.connection, asset.setConnection] = useState(undefined);
  [asset.currency, asset.setCurrency] = useState(undefined);
  [asset.balance, asset.setBalance] = useState(undefined);

  asset.connect = (connection) => {
    const provider = new ethers.providers.Web3Provider(connection.ethereum);
    asset.setContract(
      new ethers.Contract(asset.address, assetABI, provider).connect(
        provider.getSigner()
      )
    );
    asset.setConnection(connection);
  };

  asset.getCurrency = async () => {
    let currency = undefined;
    asset.setCurrency(currency);

    try {
      const getCurrency = await asset.contract.getCurrency(
        asset.defaultCurrency
      );
      console.log("[AssetContext.getCurrency]", "getCurrency", getCurrency);

      currency = {};
      currency.name = getCurrency[0];
      currency.price = getCurrency[1];
      currency.formatted = ethers.utils.formatEther(currency.price);
      console.log("[AssetContext.getCurrency]", "currency", currency);

      asset.setCurrency(currency);
    } catch (e) {
      console.log("[AssetContext.getBalance]", "error", e);
    }
    return currency;
  };

  asset.getBalance = async () => {
    let balance = undefined;
    asset.setBalance(balance);

    try {
      const balanceOf = await asset.contract.balanceOf(asset.connection.wallet);
      console.log("[AssetContext.getBalance]", "balanceOf", balanceOf);

      balance = balanceOf.toNumber();
      console.log("[AssetContext.getBalance]", "balance", balance);

      asset.setBalance(balance);
    } catch (e) {
      console.log("[AssetContext.getBalance]", "error", e);
    }
    return balance;
  };

  asset.mint = async () => {
    let mint = false;
    try {
      const tx = await asset.contract.mint(asset.defaultCurrency, {
        value: asset.currency.price,
      });
      console.log("[AssetContext.mint]", "tx", tx);

      const r = await tx.wait();
      mint = r.status == 1;
    } catch (e) {
      console.log("[AssetContext.mint]", "error", e);
    }

    return mint;
  };

  return asset;
};

export const AssetContext = React.createContext();

export const AssetProvider = (params) => {
  const asset = Asset(params.address);

  return (
    <AssetContext.Provider value={asset}>
      {params.children}
    </AssetContext.Provider>
  );
};
