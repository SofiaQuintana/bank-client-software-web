import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NewUser } from '../new-user';
import { ConfirmPasswordValidator } from '../password.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createForm : FormGroup;
  //encargado de controlar si el form ha sido 'enviado'
  submitted = false;
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

  constructor(private formBuilder : FormBuilder, private userService : UserService) {
   }

   get f(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }



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
          response = this.serverResponseObject;
          console.log(this.serverResponseObject);
        },
        (error : HttpErrorResponse) => {
          console.error(error.error.information_message)
        }
      )
    }

  }

}
