import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../core/services/subscription.service';
import { MESSAGES } from '../../utils/messages';

@Component({
  selector: 'not-subscribed',
  templateUrl: './not-subscribed.component.html',
  styleUrls: ['not-subscribed.component.scss'],
})
export class NotSubscribedComponent implements OnInit {
  readonly MESSAGES = MESSAGES.NOT_SUBSCRIBED;

  etherSubscriptionPrice!: string;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPrice();
  }

  subscribe() {
    this.subscriptionService
      .doSubscription()
      .then(() => this.router.navigate(['/dashboard']));
  }

  private getPrice() {
    this.subscriptionService
      .getEtherSubscriptionPrice()
      .then((value: string) => {
        this.etherSubscriptionPrice = value;
      });
  }
}
