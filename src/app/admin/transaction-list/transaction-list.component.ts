import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  username : any;
  transactions : any = [];
  page : any;

  constructor(private adminService : AdminService , private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteParam();
    this.getTransactions();
  }

  /**
   * gets account id param sent in url,
   * in a dynamic way.
   */
   getRouteParam() {
    this.actRoute.paramMap.subscribe(
      (param) => {
        this.username = param.get('id');
      }
    );
  }

  getTransactions() {
    this.adminService.getTransactions(this.username).subscribe(
      (response) => {
        this.transactions = response;
        console.log(this.transactions);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    )
  }
}
