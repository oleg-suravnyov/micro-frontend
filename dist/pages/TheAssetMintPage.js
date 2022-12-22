import React from "react";
import { AssetProvider } from "microfrontend-context";
import TheAssetMintCard from "../mint/TheAssetMintCard";
import "./TheAssetMintPage.css";
const TheAssetMintPage = () => {
  return /*#__PURE__*/React.createElement(AssetProvider, {
    address: "0x415e8BF86aB4884D4fcC6670959643621C475a30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "asset-mint-page-container"
  }, /*#__PURE__*/React.createElement(TheAssetMintCard, null)));
};
export default TheAssetMintPage;