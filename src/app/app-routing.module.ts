import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NotSubscribedComponent } from '@components/no-subscriber/not-subscribed.component';
import { W3MLoginComponent } from '@components/w3m-login/w3m-login.component';
import { HasNetworkIdGuard } from '@guards/has-netwrok-guard.service';

const routes: Routes = [
  {
    path: '',
    component: W3MLoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HasNetworkIdGuard],
  },
  { path: 'not-subscribed', component: NotSubscribedComponent }, // Fix when user enter directly here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
