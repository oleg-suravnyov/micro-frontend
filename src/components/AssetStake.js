import { useContext, useEffect } from "react";
import { AssetStakeContext } from "../context/index";

function AssetStake() {
  const assetStake = useContext(AssetStakeContext);

  useEffect(() => {
    window.stake = assetStake;
  });

  return <></>;
}

export default AssetStake;
