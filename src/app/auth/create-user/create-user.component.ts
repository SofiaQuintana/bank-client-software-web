import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../new-user';
import { ConfirmPasswordValidator } from '../password.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  //form
  createForm : FormGroup;
  //encargado de controlar si el form ha sido 'enviado'
  submitted = false;
  //Controls if http response status is 200
  success = false;
  //Controls if http response is >400
  error = false;
  //used to store server response
  serverResponseObject : any;

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      cui: ['', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13)
      ]],
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      passValid: ['', Validators.required]
    }, 
    {
      validators: [ConfirmPasswordValidator('password', 'passValid')]
    });
  }

  constructor(private formBuilder : FormBuilder, private userService : UserService, private router : Router) {
   }

  /**
   * it helps to obtain form components in an easier way
   */
  get f(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  /**
   * 1. if form is invalid, returns
   * 2. if form is valid
   *  2.1 obtains data submitted in form
   *  2.2 sends data to service
   *    2.2.1 on http response sets success to true and deploys a success alert
   *    2.2.2 on http error sets error to true and deploys an error alert
   */
  onSubmit() {
    this.submitted = true;
    if(this.createForm.invalid) {
      return;
    } else {
      let username = this.f.username.value;
      let password = this.f.password.value;
      let cui = this.f.cui.value;
      const user_type = 1;  
      this.userService.sendNewUserData({username, password, user_type, cui} as NewUser).subscribe(
        (response) => {
          this.success = true;
          response = this.serverResponseObject;
          console.log(this.serverResponseObject);
        },
        (error : HttpErrorResponse) => {
          this.serverResponseObject = error;
          this.error = true;
          console.error(error.error.information_message)
        }
      )
    }
  }

  /**
   * 1. sets success to false.
   * 2. redirects to login page.
   */
  redirectToLogin() {
    this.success = false;
    this.router.navigate(['/login']);
  }

  /**
   * 1. sets submitted attribute to false
   * 2. resets form values
   */
  clearValues() {
    this.submitted = false;
    this.createForm.reset();
  }
}
