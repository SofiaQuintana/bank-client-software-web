import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canLoad: [AuthGuard]
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
