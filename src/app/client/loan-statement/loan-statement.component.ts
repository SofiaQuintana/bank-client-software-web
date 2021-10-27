import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Loan } from './loan';

@Component({
  selector: 'app-loan-statement',
  templateUrl: './loan-statement.component.html',
  styleUrls: ['./loan-statement.component.css']
})
export class LoanStatementComponent implements OnInit {
  loanId : any;
  loan : Loan;
  page : any;
  movements : any = [];

  constructor(private accountService : AccountService, private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteParam();
    this.getLoanData();
  }

  /**
   * gets account id param sent in url,
   * in a dynamic way.
   */
   getRouteParam() {
    this.actRoute.paramMap.subscribe(
      (param) => {
        this.loanId = param.get('id');
      }
    );
  }

  getLoanData() {
    this.accountService.getLoanInfo(this.loanId).subscribe(
      (loan) => {
        this.loan = loan;
        console.log(loan);
        this.movements = loan.payments;
      },
      (error: HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    );
  }

}
