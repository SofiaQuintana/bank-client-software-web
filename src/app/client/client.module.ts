import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { AccountRequestComponent } from './account-request/account-request.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { AccountService } from './account.service';
import { DashboardService } from './dashboard.service';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    AccountRequestComponent,
    AccountStatusComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ], 
  providers: [
    DashboardService,
    AccountService
  ]
})
export class ClientModule { }
