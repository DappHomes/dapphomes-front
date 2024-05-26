import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marketplace } from '@utils/utils';
import { MESSAGES } from '../../utils/messages';

@Component({
  selector: 'add-marketplace',
  templateUrl: 'add-marketplace.component.html',
  styleUrls: ['./add-marketplace.component.scss'],
})
export class AddMarketplaceComponent {
  readonly MARKETPLACE_MSG = MESSAGES.ADD_MARKETPLACE;
  readonly MARKETPLACE_PLACEHOLDER = MESSAGES.ADD_MARKETPLACE.PLACEHOLDER;
  marketplace: Marketplace = {
    price: '',
    duration: '',
    token: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddMarketplaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marketplace
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
