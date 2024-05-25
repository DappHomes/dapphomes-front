import { ThemeMode } from '@web3modal/core';
import { Web3ModalOptions, defaultConfig } from '@web3modal/ethers5';
import { commonEnvironment } from './environment.common';

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://sepolia.drpc.org',
};

const amoy = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://www.oklink.com/es-la/polygon-zkevm',
  rpcUrl: 'https://polygon-amoy-bor-rpc.publicnode.com/',
};

const chains = [amoy, sepolia];

const ethersConfig = defaultConfig({
  metadata: commonEnvironment.metadata,
  defaultChainId: chains[0].chainId,
});

const web3ModalConfig: Web3ModalOptions = {
  themeMode: 'dark' as ThemeMode,
  ethersConfig,
  chains,
  projectId: import.meta.env.NG_APP_PROJECT_ID,
  enableAnalytics: true,
  enableOnramp: true,
};

export const environment = {
  web3ModalConfig,
  ABI_SUBSCRIPTION: commonEnvironment.ABI_SUBSCRIPTION,
  ABI_MARKETPLACE: commonEnvironment.ABI_MARKETPLACE,
  ABI_FACTORY: commonEnvironment.ABI_FACTORY,
  MARKETPLACE_ADDRESS: commonEnvironment.MARKETPLACE_ADDRESS,
  FACTORY_ADDRESS: commonEnvironment.FACTORY_ADDRESS,
  PINATA_PIN_LIST_URL: commonEnvironment.PINATA_PIN_LIST_URL,
  IPFS_BASE_URL: import.meta.env.NG_APP_IPFS_BASE_URL,
  PINATA_PIN_LIST_TOKEN: import.meta.env.NG_APP_PINATA_PIN_LIST_TOKEN,
};
