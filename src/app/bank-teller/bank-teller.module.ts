import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BankTellerRoutingModule } from './bank-teller-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { LoanPaymentComponent } from './loan-payment/loan-payment.component';
import { TransferComponent } from './transfer/transfer.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { OperationService } from './operation.service';

@NgModule({
  declarations: [
    DashboardComponent,
    DepositComponent,
    WithdrawalComponent,
    LoanPaymentComponent,
    CreditCardPaymentComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    BankTellerRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    OperationService
  ]
})
export class BankTellerModule { }
