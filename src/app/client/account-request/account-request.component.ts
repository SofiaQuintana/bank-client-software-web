import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { AccountRequest } from './account-request';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css']
})
export class AccountRequestComponent implements OnInit {
  serverResponseObject : any;
  isSuccess = false;
  isError = false;
  submitted = false;

  requestForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private requestService : RequestService, private router : Router) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      accountType: ['', Validators.required]
    });
  }

  /**
   * it helps to obtain form components in an easier way
   */
   get f(): { [key: string]: AbstractControl } {
    return this.requestForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.requestForm.invalid) {
      return;
    } else {
      let account_type = this.f.accountType.value;
      this.requestService.sendAccountRequest({account_type} as AccountRequest).subscribe(
        (response) => {
          this.isSuccess = true;
          console.log(response);
        },
        (error : HttpErrorResponse) => {
          console.error(error.error.information_message);
          this.serverResponseObject = error;
          this.isError = true;
        }
      );
    }
  }

  redirectToDashboard() {
    this.submitted = this.isSuccess = this.isError = false;
    this.router.navigate(['./client']);
  }
}
