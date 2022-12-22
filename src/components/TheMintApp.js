import React from "react";

import { ConnectionProvider } from "microfrontend-context";

import TheHeader from "./header/TheHeader";
import TheAssetMintPage from "./pages/TheAssetMintPage";

import "./TheMintApp.css";

function TheMintApp() {
  const getPage = () => {
    if (window.location.pathname == "/mint") {
      return <TheAssetMintPage></TheAssetMintPage>;
    }
  };

  return (
    <ConnectionProvider>
      <header className="g-header">
        <TheHeader />
      </header>
      <main className="g-content">{getPage()}</main>
    </ConnectionProvider>
  );
}

export default TheMintApp;
