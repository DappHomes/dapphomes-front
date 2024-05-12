import { Component, OnInit } from '@angular/core';
import { Numbers } from 'web3';
import { Router } from '@angular/router';
import { Web3Service } from '../../core/services/web3.service';
import { MESSAGES } from '../../utils/messages';

@Component({
  selector: 'not-subscribed',
  templateUrl: './not-subscribed.component.html',
})

export class NotSubscribedComponent implements OnInit {
  readonly MESSAGES = MESSAGES.NOT_SUBSCRIBED;

  etherSubscriptionPrice!: string;

  constructor(private web3Service: Web3Service, private router: Router) {}

  ngOnInit(): void {
    this.getPrice();
  }

  subscribe() {
    this.web3Service.doSubscription().then(() => this.router.navigate(['/dashboard']));
  }

  private getPrice() {
    this.web3Service.getEtherSubscriptionPrice().then((value: string) => {
      this.etherSubscriptionPrice = value;
    });
  }
}
