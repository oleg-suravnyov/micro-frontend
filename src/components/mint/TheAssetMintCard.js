import { useEffect, useContext, useState } from "react";

import { ConnectionContext } from "microfrontend-context";
import { AssetContext } from "microfrontend-context";

import MintModal from "./MintModal";

import "./TheAssetMintCard.css";

export const TheAssetMintCard = () => {
  const connection = useContext(ConnectionContext);
  const asset = useContext(AssetContext);

  const result = {};
  [result.message, result.setMessage] = useState(undefined);
  [result.show, result.setShow] = useState(false);

  async function mint() {
    const _result = await asset.mint();
    console.log("[AssetMintCard.mint]", "result", _result);

    if (!_result) {
      result.setMessage("Failed To Mint!");
    } else {
      result.setMessage("Successfully Minted!");
      result.setShow(true);
    }
  }

  useEffect(() => {
    if (connection.wallet) {
      asset.connect(connection);
    }
  }, [connection.wallet, connection.chainId]);

  useEffect(() => {
    if (asset.contract) {
      asset.getCurrency();
      asset.getBalance();
    }
  }, [asset.contract]);

  useEffect(() => {
    if (result.show) {
      asset.getBalance();
    } else {
      result.setMessage(undefined);
    }
  }, [result.show]);

  return (
    <>
      <div className="asset-card-container">
        <div className="asset-card-header">Mint</div>

        <div className="asset-card-content">
          <div className="asset-card-bold">
            Price:
            <span className="asset-card-plain">
              {asset.currency ? asset.currency.formatted : "Loading..."}
            </span>
          </div>
          <div className="asset-card-bold">
            Assets Balance:
            <span className="asset-card-plain">
              {asset.balance != undefined ? asset.balance : "Loading..."}
            </span>
          </div>
        </div>

        <div className="asset-card-action">
          {asset.currency ? (
            <button className="asset-card-button" onClick={mint}>
              Mint
            </button>
          ) : (
            <button className="asset-card-button" disabled>
              Mint
            </button>
          )}
        </div>
      </div>
      <MintModal show={result.show} result={result} />
    </>
  );
};

export default TheAssetMintCard;
