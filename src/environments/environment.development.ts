const sepolia = {
  chainId: 11155111,
  name: 'Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://sepolia.drpc.org'
};

const amoy = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://www.oklink.com/es-la/polygon-zkevm',
  rpcUrl: 'https://polygon-amoy-bor-rpc.publicnode.com/'
};

const chains = [
  amoy,
  sepolia,
];

export const environment = {
  chains,
  projectId: import.meta.env.NG_APP_PROJECT_ID
};