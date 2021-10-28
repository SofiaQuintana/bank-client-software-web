import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-bank-user-list',
  templateUrl: './bank-user-list.component.html',
  styleUrls: ['./bank-user-list.component.css']
})
export class BankUserListComponent implements OnInit {

  //list of bank users
  users : any = [];
  //actual page for pagination
  page : any;
  //
  isSuccess = false;
  isError = false;
  serverErrorResponse : any;

  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
    this.adminService.getBankUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    )
  }

  revokeUserSystemAccess(username : string) {
    this.adminService.revokeUserAccess(username).subscribe(
      (response) => {
        this.isSuccess = true;
        console.log(response);
        },
      (error : HttpErrorResponse) => {
        this.isError = true;
        this.serverErrorResponse = error;
        console.error(error.error.information_message);
      }
    )
  }

  redirectOnSuccess() {
    this.cleanFields();
    this.router.navigate(['/admin/disabled_users']);
  }

  cleanFields() {
    this.isError = this.isSuccess = false;
  }

  /**
   * redirects to transaction list of
   * determinated user
   * @param username 
   */
   redirectToTransactionList(username : string) {
    this.router.navigate(['/admin/transaction_list/', username]);
  } 

}
