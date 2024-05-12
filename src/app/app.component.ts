import { Component, OnInit } from '@angular/core';
import { initialize } from '@nucypher/taco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    initialize().then();
  }
}
