import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { ERRORS } from '@utils/messages';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  isDashboardVisible = false;

  constructor(private pinataService: PinataService, private router: Router) { }

  ngOnInit() {
    this.pinataService.getData()
      .then((response) => {
        this.isDashboardVisible = true;
        console.log('Decrypted response:', response);
      })
      .catch((error) => {
        console.error(error.message);
        if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
          this.router.navigate(['/not-subscribed']);
        }
      });
  }
}
