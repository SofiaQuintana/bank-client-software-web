import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [ LogInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
