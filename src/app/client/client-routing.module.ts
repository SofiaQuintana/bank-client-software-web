import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccountRequestComponent } from './account-request/account-request.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { CardStatementComponent } from './card-statement/card-statement.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CreditCardRequestComponent } from './credit-card-request/credit-card-request.component';
import { LoanStatementComponent } from './loan-statement/loan-statement.component';

const routes: Routes = [
  { path: '', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'account_request', component: AccountRequestComponent, canActivate: [AuthGuard] },
  { path: 'credit_card_request', component: CreditCardRequestComponent, canActivate: [AuthGuard] },
  { path: 'account_statement/:id', component: AccountStatusComponent, canActivate: [AuthGuard] },
  { path: 'loan_statement/:id', component: LoanStatementComponent, canActivate: [AuthGuard] },
  { path: 'card_statement/:id', component: CardStatementComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
