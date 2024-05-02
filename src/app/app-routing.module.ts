import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { W3MLoginComponent } from './components/w3m-login/w3m-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HasNetworkIdGuard } from './core/guards/has-netwrok-guard.service';

const routes: Routes = [
  { path: '', component: W3MLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [HasNetworkIdGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
