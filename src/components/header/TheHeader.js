import React from "react";

import TheMMConnectButton from "./TheMMConnectButton";

import "./TheHeader.css";

const TheHeader = () => {
  return (
    <div className="header-container">
      <div className="header-logo header-cell">STAKE</div>
      <div className="header-cell">
        <TheMMConnectButton />
      </div>
    </div>
  );
};

export default TheHeader;
