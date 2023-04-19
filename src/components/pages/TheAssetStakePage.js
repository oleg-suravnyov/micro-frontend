import React from "react";

import { AssetStakeProvider } from "microfrontend-context";

import TheAssetStakeCard from "../stake/TheAssetStakeCard";

import "./TheAssetStakePage.css";

const TheAssetStakePage = () => {
  return (
    <AssetStakeProvider address="0x9E82dB2F9F03639b1cd377cFa61abB6cF39067C2">
      <div className="asset-stake-page-container">
        <TheAssetStakeCard></TheAssetStakeCard>
      </div>
    </AssetStakeProvider>
  );
};

export default TheAssetStakePage;
