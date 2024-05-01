import { Component, OnInit } from '@angular/core';
import { Web3ModalService } from '../services/web3modal.service';

@Component({
  selector: 'w3m-login',
  templateUrl: 'w3m-login.component.html',
  styleUrls: ['w3m-login.component.scss']
})

export class W3MLoginComponent implements OnInit {
  constructor(private web3ModalService: Web3ModalService) { }

  ngOnInit(): void {
    this.web3ModalService.web3Modal.subscribeState(newState => console.log(newState));
    const { open, selectedNetworkId } = this.web3ModalService.web3Modal.getState();
    console.log('selectedNetworkId: ', selectedNetworkId);
  }
}