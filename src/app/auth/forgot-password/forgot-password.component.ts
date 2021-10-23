import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordReset } from '../password-reset';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  //reactive form for password reset
  resetForm : FormGroup;
  //http error flag
  isError = false;
  IsSuccess = false;
  submitted = false;
  serverResponseObject : any;

  constructor(private formBuilder : FormBuilder, private userService : UserService, private router : Router) { }

  //Reactive form, it builds on init.
  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  /**
   * it helps to obtain form components in an easier way
   */
   get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if(this.resetForm.invalid) {
      return;
    } else {
      let username = this.f.username.value;
      this.userService.resetPassword({ username } as PasswordReset).subscribe(
        (response) => {
          this.IsSuccess = true;
          console.log(response);
        },
        (error : HttpErrorResponse) => {
          this.isError = true;
          error = this.serverResponseObject;
          console.error(error.error.information_message);
        }
      );
    }
  }

  resetValues() {
    this.submitted = this.isError = this.IsSuccess = false;
    this.resetForm.reset();
  }

  redirectToMainPage() {
    this.resetValues();
    this.router.navigate(['/login']);
  }
}
