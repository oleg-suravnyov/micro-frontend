import React from "react";
import "./MintModal.css";
export const MintModal = props => {
  if (!props.show) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "mint-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mint-modal-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mint-modal-message"
  }, props.result.message), /*#__PURE__*/React.createElement("button", {
    className: "mint-modal-button",
    onClick: () => {
      props.result.setShow(false);
    }
  }, "Close")));
};
export default MintModal;