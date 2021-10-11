import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';

const userRoutes : Routes = [
  { path : 'login', component : LogInComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
