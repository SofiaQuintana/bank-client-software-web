import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  submitted = false;
  isError = false;
  serverResponseObject : any;
  message : any; 

  /**Controlling form html components on model, 
   * the login form constructs a json type structure 
   * grouping username and password, the value changes 
   * on real time and both values are required. */
   loginForm = this.formBuilder.group ({
    username : ['', Validators.required],
    password : ['', Validators.required]
  }); 

  constructor(private formBuilder: FormBuilder, private loginService : AuthService, private router : Router) { }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    } else {
      let username = this.f.username.value;
      let password = this.f.password.value;;
      this.loginService.sendLoginData({ username, password } as User).subscribe(
        (response) => { 
          console.log(response) 
          this.serverResponseObject = response;
          this.loginService.registerLogInData(this.serverResponseObject.user_type, this.serverResponseObject.token, this.serverResponseObject.username);
          this.goToDashboard();
        },
        (error : HttpErrorResponse) => { 
          this.isError = true;
          this.serverResponseObject = error;
          console.log(error.error.information_message)
        } 
      ); 
    }
   }

   /**
   * it helps to obtain form components in an easier way
   */
    get f(): { [key: string]: AbstractControl } {
      return this.loginForm.controls;
    }

   /**
    * redirects to dashboard based on
    * user role
    */
   private goToDashboard() {
     this.isError = false;
    let role = this.loginService.getRole();
    console.log(role)
    if(role === 'cliente') {
      this.router.navigate(['/client']);
    } else if(role === 'cajero') {
      this.router.navigate(['/bank_teller']);
    } else if(role === 'administrador') {
      this.router.navigate(['/admin']);
    } else if(role === 'solicitudes') {
      this.router.navigate(['/procedure']);
    }
   }

   redirectToPasswordReset() {
     this.router.navigate(['/password_reset']);
   }

   cleanForm() {
     this.isError = this.submitted = false;
     this.loginForm.reset();
   }
}
