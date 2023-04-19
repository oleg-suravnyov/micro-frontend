import { TheMintApp } from "microfrontend-mint";
import { TheStakeApp } from "microfrontend-stake";
function TheSuperApp() {
  const getApp = () => {
    if (window.location.pathname == "/stake") {
      return /*#__PURE__*/React.createElement(TheStakeApp, null);
    }
    if (window.location.pathname == "/mint") {
      return /*#__PURE__*/React.createElement(TheMintApp, null);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, getApp());
}
export default TheSuperApp;