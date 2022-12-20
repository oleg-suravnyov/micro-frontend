import { useContext, useEffect } from "react";
import { ConnectionContext } from "../context/index";

function Connection() {
  const connection = useContext(ConnectionContext);

  useEffect(() => {
    window.connection = connection;
  });

  return <></>;
}

export default Connection;
