import React from "react";

import { ConnectionProvider } from "microfrontend-context";

import TheHeader from "./header/TheHeader";
import TheAssetStakePage from "./pages/TheAssetStakePage";

import "./TheStakeApp.css";

function TheStakeApp() {
  const getPage = () => {
    if (window.location.pathname == "/stake") {
      return <TheAssetStakePage></TheAssetStakePage>;
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

export default TheStakeApp;
