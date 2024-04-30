import { Component } from '@angular/core';
import { ThresholdMessageKit } from '@nucypher/taco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messageKit!: ThresholdMessageKit;

  handleSecretMessage(messageKit: ThresholdMessageKit) {
    this.messageKit = messageKit;
  }
}
