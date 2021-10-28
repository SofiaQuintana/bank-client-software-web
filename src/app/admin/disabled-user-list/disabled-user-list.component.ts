import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-disabled-user-list',
  templateUrl: './disabled-user-list.component.html',
  styleUrls: ['./disabled-user-list.component.css']
})
export class DisabledUserListComponent implements OnInit {

  users : any = [];
  page : any;

  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
    this.adminService.getDisabledUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    );
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
