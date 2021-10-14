import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  serverResponseObject : any;
  message : any; 

  /**Controlling form html components on model, 
   * the login form constructs a json type structure 
   * grouping username and password, the value changes 
   * on real time and both values are required. */
   loginForm = this.formBuilder.group ({
    username : ['', Validators.required],
    password : ['', Validators.required, Validators.minLength(8)]
  }); 

  constructor(private formBuilder: FormBuilder, private loginService : AuthService, private router : Router) { }

  onSubmit() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.loginService.sendLoginData({ username, password } as User).subscribe(
      (response) => { 
        console.log(response) 
        this.serverResponseObject = response;
        this.loginService.registerLogInData(this.serverResponseObject.user_type);
        this.goToDashboard();
      },
      (error : HttpErrorResponse) => { 
         console.log(error.error.information_message)
      } 
    ); 
   }

   private goToDashboard() {
    let role = this.loginService.getRole();
    console.log(role)
    if(role === 'cliente') {
      this.router.navigate(['/client']);
    }
   }
}
