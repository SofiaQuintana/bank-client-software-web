import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OperationService } from '../operation.service';
import { LoanPayment } from './loan-payment';

@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.component.html',
  styleUrls: ['./loan-payment.component.css']
})
export class LoanPaymentComponent implements OnInit {


  submitted = false;
  isError = false;
  isSuccess = false;
  requestForm : FormGroup;
  serverResponseObject : any;

  constructor(private formBuilder : FormBuilder, private operationService : OperationService, private router : Router) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      loanId: ['', Validators.required],
      amount: ['', Validators.required]
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
    if(this.requestForm.invalid) return;
    else {
      let loanId = this.f.loanId.value;
      let amount = this.f.amount.value;
      this.operationService.requestLoanPayment(new LoanPayment(loanId, amount)).subscribe(
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
    this.router.navigate(['./bank_teller']);
  }

  cleanForm() {
    this.isError = this.isSuccess = false;
    this.requestForm.reset();
  }

}