import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../account';
import { Movement } from './movement';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.css']
})
export class AccountStatusComponent implements OnInit {
  //account that's going to be displayed
  account : Account;
  //account id
  accountId : any;
  //actual page for pagination
  page : any;
  //Array for account movements
  movements : any = [];

  constructor(private accountService : AccountService, private actRoute : ActivatedRoute) { 
  }

  /**
   * on init 
   * 1. get account id sent as a param in url
   * 2. get account data by id
   */
  ngOnInit() {
    this.getRouteParam();
    this.getAccountData();
  }

  /**
   * gets account id param sent in url,
   * in a dynamic way.
   */
  getRouteParam() {
    this.actRoute.paramMap.subscribe(
      (param) => {
        this.accountId = param.get('id');
      }
    );
  }
 
  /**
   * 1. call http get request function
   * 2. if response is an account
   *  2.1 set response value into global var (easier data display purposes)
   *  2.2 set account movements into global array (easier data display purposes)
   * 3. if response is an error >400
   *  3.1 pending ------
   */
  getAccountData() {
    this.accountService.getAccountInfo(this.accountId).subscribe(
      (account) => {
        this.account = account;
        this.movements = account.movements;
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    );
  }

}
