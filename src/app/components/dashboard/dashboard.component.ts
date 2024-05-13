import { Component, OnInit } from '@angular/core';
import { PinataService } from '@services/pinata.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  constructor(private pinataService: PinataService) { }

  ngOnInit() {
    this.pinataService.getData().then();
  }
}
