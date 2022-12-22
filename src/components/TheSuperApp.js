import { TheMintApp } from "microfrontend-mint";
import { TheStakeApp } from "microfrontend-stake";

function TheSuperApp() {
  const getApp = () => {
    if (window.location.pathname == "/stake") {
      return <TheStakeApp></TheStakeApp>;
    }
    if (window.location.pathname == "/mint") {
      return <TheMintApp></TheMintApp>;
    }
  };

  return <>{getApp()}</>;
}

export default TheSuperApp;
