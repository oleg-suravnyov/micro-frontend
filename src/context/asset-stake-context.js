import React, { useState } from "react";
import { ethers } from "ethers";
import assetStakeABI from "./abi/asset-stake-abi";

const AssetStake = (address) => {
  const assetStake = {};

  assetStake.address = address;

  [assetStake.contract, assetStake.setContract] = useState(undefined);
  [assetStake.connection, assetStake.setConnection] = useState(undefined);
  [assetStake.balance, assetStake.setBalance] = useState(undefined);

  assetStake.connect = (connection) => {
    const provider = new ethers.providers.Web3Provider(connection.ethereum);
    assetStake.setContract(
      new ethers.Contract(assetStake.address, assetStakeABI, provider).connect(
        provider.getSigner()
      )
    );
    assetStake.setConnection(connection);
  };

  assetStake.getBalance = async () => {
    let balance = undefined;
    assetStake.setBalance(balance);

    try {
      const getStakeSize = await assetStake.contract.getStakesSize(
        assetStake.connection.wallet
      );
      console.log(
        "[AssetStakeContext.getBalance]",
        "getStakeSize",
        getStakeSize
      );

      balance = getStakeSize.toNumber();
      console.log("[AssetStakeContext.getBalance]", "balance", balance);

      assetStake.setBalance(balance);
    } catch (e) {
      console.log("[AssetStakeContext.getBalance]", "error", e);
    }
    return balance;
  };

  assetStake.stake = async (assets) => {
    console.log("[AssetStakeContext.stake]", "assets", assets);

    let stake = false;
    try {
      const tx = await assetStake.contract.stake(assets);
      console.log("[AssetStakeContext.stake]", "tx", tx);

      const r = await tx.wait();
      stake = r.status == 1;
    } catch (e) {
      console.log("[AssetStakeContext.stake]", "error", e);
    }

    return stake;
  };

  assetStake.withdraw = async () => {
    let withdraw = false;
    try {
      const tx = await assetStake.contract.withdrawAll(true);
      console.log("[AssetStakeContext.withdraw]", "tx", tx);

      const r = await tx.wait();
      withdraw = r.status == 1;
    } catch (e) {
      console.log("[AssetStakeContext.withdraw]", "error", e);
    }

    return withdraw;
  };

  assetStake.claim = async () => {
    let claim = false;
    try {
      const tx = await assetStake.contract.yieldAll();
      console.log("[AssetStakeContext.claim]", "tx", tx);

      const r = await tx.wait();
      claim = r.status == 1;
    } catch (e) {
      console.log("[AssetStakeContext.claim]", "error", e);
    }

    return claim;
  };

  assetStake.estimate = async (stake) => {
    console.log("[AssetStakeContext.estimate]", "stake", stake);

    try {
      const estimate = await assetStake.contract.estimate(
        assetStake.connection.wallet,
        stake
      );
      console.log("[AssetStakeContext.estimate]", "estimate", estimate);

      return ethers.utils.formatEther(estimate);
    } catch (e) {
      console.log("[AssetStakeContext.estimate]", "error", e);
    }

    return undefined;
  };

  return assetStake;
};

export const AssetStakeContext = React.createContext();

export const AssetStakeProvider = (params) => {
  const assetStake = AssetStake(params.address);

  return (
    <AssetStakeContext.Provider value={assetStake}>
      {params.children}
    </AssetStakeContext.Provider>
  );
};
