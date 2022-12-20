const assetStakeABI = [
  "function stake(uint256[])",
  "function getStakesSize(address) view returns (uint256)",
  "function estimate(address, uint256) view returns (uint256)",
  "function withdrawAll(bool)",
  "function yieldAll()",
];

export default assetStakeABI;
