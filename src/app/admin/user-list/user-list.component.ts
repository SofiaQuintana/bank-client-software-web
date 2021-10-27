import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //array for user list
  users : any = [];
  //actual page for pagination
  page : any;

  constructor(private adminService : AdminService) { }

  /**
   * 1. get all users 
   * 2. if response status 200
   *  2.1 set response list for view display data
   * 3. if response is an error
   *  3.1 pending
   */
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error : HttpErrorResponse) => {
        console.error(error);
      }
    )
  }

}
