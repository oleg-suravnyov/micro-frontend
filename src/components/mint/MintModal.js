import React from "react";

import "./MintModal.css";

export const MintModal = (props) => {
  if (!props.show) {
    return <></>;
  }

  return (
    <div className="mint-modal">
      <div className="mint-modal-container">
        <div className="mint-modal-message">{props.result.message}</div>
        <button
          className="mint-modal-button"
          onClick={() => {
            props.result.setShow(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MintModal;
