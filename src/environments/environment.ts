import { defaultConfig } from '@web3modal/ethers5';
import { ThemeMode } from '@web3modal/core';
import { commonEnvironment } from './environment.common';

const ethereum = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const chains = [ethereum];

const ethersConfig = defaultConfig({
  metadata: commonEnvironment.metadata,
  defaultChainId: chains[0].chainId,
});

const web3ModalConfig = {
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
  MARKETPLACE_AMOY_ADDRESS: commonEnvironment.MARKETPLACE_AMOY_ADDRESS,
  ABI_FACTORY: commonEnvironment.ABI_FACTORY,
  FACTORY_AMOY_ADDRESS: commonEnvironment.FACTORY_AMOY_ADDRESS,
  PINATA_PIN_LIST_URL: commonEnvironment.PINATA_PIN_LIST_URL,
  IPFS_BASE_URL: import.meta.env.NG_APP_IPFS_BASE_URL,
  PINATA_PIN_LIST_TOKEN: import.meta.env.NG_APP_PINATA_PIN_LIST_TOKEN,
};
