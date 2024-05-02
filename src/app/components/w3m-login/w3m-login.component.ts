import { Component, OnInit } from '@angular/core';
import { Web3ModalService } from '../../core/services/web3modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'w3m-login',
  templateUrl: 'w3m-login.component.html',
  styleUrls: ['w3m-login.component.scss']
})

export class W3MLoginComponent implements OnInit {
  constructor(private web3ModalService: Web3ModalService, private router: Router,) { }

  ngOnInit(): void {
    this.web3ModalService.web3Modal.subscribeState(({selectedNetworkId}) => {
      if (selectedNetworkId) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}