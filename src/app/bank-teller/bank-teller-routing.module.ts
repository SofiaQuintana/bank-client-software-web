import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoanPaymentComponent } from './loan-payment/loan-payment.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, 
    canActivate: [AuthGuard],
    children :[
      { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
      { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]},
      { path: 'withdrawal', component: WithdrawalComponent, canActivate: [AuthGuard]},
      { path: 'loan_payment', component: LoanPaymentComponent, canActivate: [AuthGuard]},
      { path: 'credit_card_payment', component: CreditCardPaymentComponent, canActivate: [AuthGuard]}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankTellerRoutingModule { }