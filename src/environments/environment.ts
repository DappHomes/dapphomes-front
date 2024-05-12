import { defaultConfig } from '@web3modal/ethers5';
import { commonEnvironment } from './environment.common';
import { ThemeMode } from '@web3modal/core';

const ethereum = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const chains = [
  ethereum,
]

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
  web3ModalConfig,
  ABI: commonEnvironment.ABI,
  CONTRACT_ADDRESS: commonEnvironment.CONTRACT_ADDRESS,
};