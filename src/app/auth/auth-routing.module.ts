import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogInComponent } from './log-in/log-in.component';

const authRoutes : Routes = [
  { path : 'login', component : LogInComponent },
  { path : 'create', component : CreateUserComponent },
  { path : 'password_reset', component : ForgotPasswordComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
