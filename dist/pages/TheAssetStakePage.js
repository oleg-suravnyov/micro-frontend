import React from "react";
import { AssetStakeProvider } from "microfrontend-context";
import TheAssetStakeCard from "../stake/TheAssetStakeCard";
import "./TheAssetStakePage.css";
const TheAssetStakePage = () => {
  return /*#__PURE__*/React.createElement(AssetStakeProvider, {
    address: "0x9E82dB2F9F03639b1cd377cFa61abB6cF39067C2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "asset-stake-page-container"
  }, /*#__PURE__*/React.createElement(TheAssetStakeCard, null)));
};
export default TheAssetStakePage;