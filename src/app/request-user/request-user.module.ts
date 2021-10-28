import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestUserRoutingModule } from './request-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RequestListComponent } from './request-list/request-list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    RequestUserRoutingModule,
    NgxPaginationModule
  ]
})
export class RequestUserModule { }
