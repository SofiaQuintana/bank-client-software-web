import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { AuthService } from './auth.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserService } from './user.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [ 
    LogInComponent,
    CreateUserComponent,
    ForgotPasswordComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class AuthModule { }
