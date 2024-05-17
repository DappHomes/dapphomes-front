import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { W3MLoginComponent } from '@components/w3m-login/w3m-login.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NotSubscribedComponent } from '@components/no-subscriber/not-subscribed.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    W3MLoginComponent,
    DashboardComponent,
    NotSubscribedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
