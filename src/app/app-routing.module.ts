import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canLoad: [AuthGuard],
    data: {
      role: 'cliente'
    }
  },
  {
    path: 'bank_teller',
    loadChildren: () => import('./bank-teller/bank-teller.module').then(m => m.BankTellerModule),
    canLoad: [AuthGuard],
    data: {
      role: 'cajero' 
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    data: {
      role: 'administrador' 
    }
  },
  {
    path: 'procedure',
    loadChildren: () => import('./request-user/request-user.module').then(m => m.RequestUserModule),
    canLoad: [AuthGuard],
    data: {
      role: 'solicitudes' 
    }
  }
];

@NgModule({
  imports: [
              RouterModule.forRoot(
                appRoutes, 
                {enableTracing : true}
              )
            ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
