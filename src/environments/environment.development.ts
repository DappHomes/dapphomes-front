import { ThemeMode } from '@web3modal/core';
import { commonEnvironment } from './environment.common';
import { defaultConfig } from '@web3modal/ethers5';

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

const ethersConfig = defaultConfig({
  metadata: commonEnvironment.metadata,
  defaultChainId: chains[0].chainId
});

const web3ModalConfig = {
  themeMode: 'dark' as ThemeMode,
  ethersConfig,
  chains,
  projectId: import.meta.env.NG_APP_PROJECT_ID,
  enableAnalytics: true,
  enableOnramp: true
};

export const environment = {
  web3ModalConfig
};