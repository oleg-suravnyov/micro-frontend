import {
  ConnectionProvider,
  AssetProvider,
  AssetStakeProvider,
} from "./context/index";

import Connection from "./components/Connection";
import Asset from "./components/Asset";
import AssetStake from "./components/AssetStake";

import "./App.css";

function App() {
  return (
    <ConnectionProvider>
      <Connection></Connection>

      <AssetProvider address="0x415e8BF86aB4884D4fcC6670959643621C475a30">
        <Asset></Asset>
      </AssetProvider>

      <AssetStakeProvider address="0x9E82dB2F9F03639b1cd377cFa61abB6cF39067C2">
        <AssetStake></AssetStake>
      </AssetStakeProvider>
    </ConnectionProvider>
  );
}

export default App;
