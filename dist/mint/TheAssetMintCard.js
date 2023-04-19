import React, { useEffect, useContext, useState } from "react";
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "asset-card-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "asset-card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "asset-card-column"
  }, /*#__PURE__*/React.createElement("div", null, "Balance:"), /*#__PURE__*/React.createElement("div", null, "Price:")), /*#__PURE__*/React.createElement("div", {
    className: "asset-card-column"
  }, /*#__PURE__*/React.createElement("div", null, asset.balance != undefined ? asset.balance : "Loading..."), /*#__PURE__*/React.createElement("div", null, asset.currency ? asset.currency.formatted : "Loading..."))), asset.currency ? /*#__PURE__*/React.createElement("button", {
    className: "asset-card-button",
    onClick: mint
  }, "Mint") : /*#__PURE__*/React.createElement("button", {
    className: "asset-card-button",
    disabled: true
  }, "Mint")), /*#__PURE__*/React.createElement(MintModal, {
    show: result.show,
    result: result
  }));
};
export default TheAssetMintCard;