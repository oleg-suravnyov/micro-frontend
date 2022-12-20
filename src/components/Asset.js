import { useContext, useEffect } from "react";
import { AssetContext } from "../context/index";

function Asset() {
  const asset = useContext(AssetContext);

  useEffect(() => {
    window.asset = asset;
  });

  return <></>;
}

export default Asset;
