import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestUserRoutingModule } from './request-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RequestUserRoutingModule
  ]
})
export class RequestUserModule { }
