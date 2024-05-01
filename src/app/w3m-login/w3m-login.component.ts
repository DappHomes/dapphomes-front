import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5';
import { ThemeMode } from '@web3modal/core';

@Component({
  selector: 'w3m-login',
  templateUrl: 'w3m-login.component.html',
  styleUrls: ['w3m-login.component.scss']
})

export class W3MLoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.createWeb3Modal();
  }

  private createWeb3Modal() {    
    const ethersConfig = defaultConfig({
      metadata: environment.metadata,
      defaultChainId: environment.chains[0].chainId
    });

    const web3ModalConfig = {
      themeMode: 'dark' as ThemeMode,
      ethersConfig,
      chains: environment.chains,
      projectId: environment.projectId,
      enableAnalytics: true,
      enableOnramp: true
    }
    
    const modal = createWeb3Modal(web3ModalConfig);
    
    modal.subscribeState(newState => console.log(newState));
    
    const { open, selectedNetworkId } = modal.getState();
    console.log('selectedNetworkId: ', selectedNetworkId);
  }
}