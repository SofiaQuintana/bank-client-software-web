import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  { path: '', 
  component: DashboardComponent, 
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {path: 'request_list/:id', component: RequestListComponent, canActivate: [AuthGuard]}
      ]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestUserRoutingModule { }
