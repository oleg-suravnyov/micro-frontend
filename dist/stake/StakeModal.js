import React from "react";
import "./StakeModal.css";
export const StakeModal = props => {
  if (!props.show) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "stake-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stake-modal-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stake-modal-message"
  }, props.result.message), /*#__PURE__*/React.createElement("button", {
    className: "stake-modal-button",
    onClick: () => {
      props.result.setShow(false);
    }
  }, "Close")));
};
export default StakeModal;