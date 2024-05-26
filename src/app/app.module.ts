import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { W3MLoginComponent } from '@components/w3m-login/w3m-login.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NotSubscribedComponent } from '@components/no-subscriber/not-subscribed.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LineChartComponent } from '@components/charts/line-chart/line-chart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMarketplaceComponent } from '@components/add-marketplace/add-marketplace.component';

@NgModule({
  declarations: [
    AppComponent,
    W3MLoginComponent,
    DashboardComponent,
    NotSubscribedComponent,
    LineChartComponent,
    AddMarketplaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
