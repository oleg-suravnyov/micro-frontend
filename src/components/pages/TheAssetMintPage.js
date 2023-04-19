import React from "react";

import { AssetProvider } from "microfrontend-context";

import TheAssetMintCard from "../mint/TheAssetMintCard";

import "./TheAssetMintPage.css";

const TheAssetMintPage = () => {
  return (
    <AssetProvider address="0x415e8BF86aB4884D4fcC6670959643621C475a30">
      <div className="asset-mint-page-container">
        <TheAssetMintCard></TheAssetMintCard>
      </div>
    </AssetProvider>
  );
};

export default TheAssetMintPage;
