import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OperationService } from '../operation.service';
import { Transfer } from './transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  submitted = false;
  isError = false;
  isSuccess = false;
  requestForm : FormGroup;
  serverResponseObject : any;

  constructor(private formBuilder : FormBuilder, private operationService : OperationService, private router : Router) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      originAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
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
    this.isError = this.isSuccess = false
    this.submitted = true;
    if(this.requestForm.invalid) return;
    else {
      let originAccountId = this.f.originAccountId.value;
      let destinationAccountId = this.f.destinationAccountId.value;
      let amount = this.f.amount.value;
      this.operationService.requestTransfer(new Transfer(originAccountId, destinationAccountId, amount)).subscribe(
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