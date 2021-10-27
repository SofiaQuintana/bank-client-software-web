import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BankUserListComponent } from './bank-user-list/bank-user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'all_users', component: UserListComponent},
          { path: 'bank_users', component: BankUserListComponent
        }
        ]
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
