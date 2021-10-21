import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { LogInComponent } from './log-in/log-in.component';

const authRoutes : Routes = [
  { path : 'login', component : LogInComponent },
  { path : 'create', component : CreateUserComponent }
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
