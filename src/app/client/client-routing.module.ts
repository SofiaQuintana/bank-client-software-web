import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccountRequestComponent } from './account-request/account-request.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CreditCardRequestComponent } from './credit-card-request/credit-card-request.component';

const routes: Routes = [
  { path: '', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'account_request', component: AccountRequestComponent, canActivate: [AuthGuard] },
  { path: 'credit_card_request', component: CreditCardRequestComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
