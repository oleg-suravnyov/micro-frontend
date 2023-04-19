import React from "react";

import "./StakeModal.css";

export const StakeModal = (props) => {
  if (!props.show) {
    return <></>;
  }

  return (
    <div className="stake-modal">
      <div className="stake-modal-container">
        <div className="stake-modal-message">{props.result.message}</div>
        <button
          className="stake-modal-button"
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

export default StakeModal;
