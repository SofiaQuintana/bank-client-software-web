import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { CreditCardRequest } from './credit-card-request';

@Component({
  selector: 'app-credit-card-request',
  templateUrl: './credit-card-request.component.html',
  styleUrls: ['./credit-card-request.component.css']
})
export class CreditCardRequestComponent implements OnInit {

  submitted = false;
  isError = false;
  isSuccess = false;
  requestForm : FormGroup;
  serverResponseObject : any;

  constructor(private formBuilder : FormBuilder, private requestService : RequestService, private router : Router) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      monthlyIncome: ['', Validators.required],
      desiredAmount: ['', Validators.required]
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
      let monthly_income = this.f.monthlyIncome.value;
      let desire_amount = this.f.desiredAmount.value;
      this.requestService.sendCreditCardRequest({ monthly_income, desire_amount} as CreditCardRequest).subscribe(
        (response) => {
          this.isSuccess = true;
        },
        (error : HttpErrorResponse) => {
          this.serverResponseObject = error;
          this.isError = true;
        }
      ) 
    }
  }

  redirectToDashboard() {
    this.isError = this.isSuccess = this.submitted = false;
    this.router.navigate(['./client']);
  }

  cleanForm() {
    this.isError = this.isSuccess = false;
    this.requestForm.reset();
  }
}
