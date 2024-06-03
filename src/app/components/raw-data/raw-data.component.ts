import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MESSAGES } from '@utils/messages';
import { Address } from 'web3';

@Component({
  selector: 'raw-data',
  templateUrl: 'raw-data.component.html',
})
export class RawDataComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { rawData: any; selectedAddress: Address }
  ) {}

  readonly RAW_DATA_MSG = MESSAGES.RAW_DATA;
}
