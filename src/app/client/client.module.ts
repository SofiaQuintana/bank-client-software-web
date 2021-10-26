import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { AccountRequestComponent } from './account-request/account-request.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { AccountService } from './account.service';
import { DashboardService } from './dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestService } from './request.service';
import { CreditCardRequestComponent } from './credit-card-request/credit-card-request.component';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    AccountRequestComponent,
    AccountStatusComponent,
    CreditCardRequestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    NgxPaginationModule
  ], 
  providers: [
    DashboardService,
    AccountService,
    RequestService
  ]
})
export class ClientModule { }
