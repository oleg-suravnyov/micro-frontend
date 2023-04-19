import React, { useEffect, useContext, useState } from "react";

import { ConnectionContext } from "microfrontend-context";
import { AssetStakeContext } from "microfrontend-context";

import StakeModal from "./StakeModal";

import "./TheAssetStakeCard.css";

export const TheAssetStakeCard = () => {
  const connection = useContext(ConnectionContext);
  const assetStake = useContext(AssetStakeContext);

  const [assets, setAssets] = useState("");
  const [estimation, setEstimation] = useState(undefined);

  const result = {};
  [result.message, result.setMessage] = useState(undefined);
  [result.show, result.setShow] = useState(false);

  const stake = async () => {
    const _result = await assetStake.stake(String(assets).split(","));
    console.log("[AssetStakeCard.stake]", "result", _result);

    if (!_result) {
      result.setMessage("Failed To Mint!");
    } else {
      result.setMessage("Successfully Minted!");
      result.setShow(true);
    }
  };

  const withdraw = async () => {
    const _result = await assetStake.withdraw();
    console.log("[AssetStakeCard.withdraw]", "result", _result);

    if (!_result) {
      result.setMessage("Failed To Witdraw!");
    } else {
      result.setMessage("Successfully Did Witdraw!");
      result.setShow(true);
    }
  };

  const updateAssets = (event) => {
    const value = event.target.value;
    setAssets(value);
  };

  useEffect(() => {
    if (connection.wallet) {
      assetStake.connect(connection);
    }
  }, [connection.wallet, connection.chainId]);

  useEffect(() => {
    if (assetStake.contract) {
      assetStake.getBalance();
    }
  }, [assetStake.contract]);

  useEffect(() => {
    if (assetStake.balance) {
      for (let i = 0; i < assetStake.balance; i++) {
        assetStake
          .estimate(i)
          .then((result) =>
            setEstimation((prev) =>
              prev ? prev + Number(result) : Number(result)
            )
          );
      }
    } else {
      setEstimation(0);
    }
  }, [assetStake.balance]);

  useEffect(() => {
    if (result.show) {
      setAssets("");
      assetStake.getBalance();
    } else {
      result.setMessage(undefined);
    }
  }, [result.show]);

  return (
    <>
      <div className="asset-stake-card-container">
        <div className="asset-stake-card-content">
          <div className="asset-stake-card-column">
            <div>Balance:</div>
            <div>Estimation:</div>
          </div>
          <div className="asset-stake-card-column">
            <div>
              {assetStake.balance != undefined
                ? assetStake.balance
                : "Loading..."}
            </div>
            <div>{estimation ? Number(estimation).toFixed(10) : 0}</div>
          </div>
        </div>
        <div className="asset-stake-card-action">
          <input
            className="asset-stake-card-input"
            value={assets}
            onChange={updateAssets}
          ></input>
          {assets ? (
            <button className="asset-stake-card-button" onClick={stake}>
              Stake
            </button>
          ) : (
            <button className="asset-stake-card-button" disabled>
              Stake
            </button>
          )}
        </div>
      </div>
      <StakeModal show={result.show} result={result} />
    </>
  );
};

export default TheAssetStakeCard;
