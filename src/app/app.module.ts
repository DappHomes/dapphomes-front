import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { W3MLoginComponent } from '@components/w3m-login/w3m-login.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NotSubscribedComponent } from '@components/no-subscriber/not-subscribed.component';

@NgModule({
  declarations: [
    AppComponent,
    W3MLoginComponent,
    DashboardComponent,
    NotSubscribedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
