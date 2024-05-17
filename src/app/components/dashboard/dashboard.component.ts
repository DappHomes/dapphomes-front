import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinataService } from '@services/pinata.service';
import { Web3Service } from '@services/web3.service';
import { ERRORS } from '@utils/messages';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  isDashboardVisible = false;

  constructor(
    private pinataService: PinataService,
    private web3Service: Web3Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isDashboardVisible = true;
    this.submitted = false;
  }

  formData = {
    houseAddress: '',
  };

  submitted: boolean = false;

  listToken: string = '';

  rawData: string = '';

  onSubmit() {
    // 1. choose a house given the address
    this.submitted = true;
    this.web3Service.initContract(this.formData.houseAddress);

    // 2. get pinata token
    this.web3Service.getListToken().then((value: string) => {
      this.listToken = value;

      // 3. try to decrypt data
      this.pinataService.getData(this.listToken)
        .then((response) => {
          this.isDashboardVisible = true;
          this.rawData = JSON.parse(response);
        })
        .catch((error) => {
          if (error.message.includes(ERRORS.DECRYPTION_FAILED)) {
            this.router.navigate(['/not-subscribed']);
          }
        });
    });
  }
}
