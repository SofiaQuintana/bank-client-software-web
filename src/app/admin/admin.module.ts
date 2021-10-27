import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BankUserListComponent } from './bank-user-list/bank-user-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DisabledUserListComponent } from './disabled-user-list/disabled-user-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    UserListComponent,
    BankUserListComponent,
    DisabledUserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
