import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMarketplaceComponent } from '@components/add-marketplace/add-marketplace.component';
import { FactoryService } from '@services/factory.service';
import { Web3Service } from '@services/web3.service';
import { MESSAGES } from '@utils/messages';
import { Marketplace } from '@utils/utils';

@Component({
  selector: 'create-marketplace',
  templateUrl: 'create-marketplace.component.html',
})
export class CreateMarketplaceComponent {
  CREATE_MARKETPLACE = MESSAGES.CREATE_MARKETPLACE;

  constructor(
    private factoryService: FactoryService,
    private web3Service: Web3Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openCreateMarketplaceModal() {
    const dialogRef = this.dialog.open(AddMarketplaceComponent);
    dialogRef.afterClosed().subscribe((marketplace: Marketplace) => {
      if (!marketplace) {
        return;
      }
      const { token, price, duration } = marketplace;
      if (!token || !price || !duration) {
        this.wrongMarketplace('Missing fields');
        return;
      }
      const wei = this.web3Service.getWeiConversion(price);
      this.createMarketplace(wei, duration, token);
    });
  }

  private createMarketplace(price: string, duration: string, token: string) {
    this.factoryService
      .createMarketplace(price, duration, token)
      .then((algo) => {
        console.log(algo);
      })
      .catch((error) => {
        console.error(error);
        this.wrongMarketplace('Error creating marketplace');
      });
  }

  private wrongMarketplace(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['wrong-marketplace'],
    });
  }
}
