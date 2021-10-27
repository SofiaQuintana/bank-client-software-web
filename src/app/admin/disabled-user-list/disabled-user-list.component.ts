import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-disabled-user-list',
  templateUrl: './disabled-user-list.component.html',
  styleUrls: ['./disabled-user-list.component.css']
})
export class DisabledUserListComponent implements OnInit {

  users : any = [];
  page : any;

  constructor(private adminService : AdminService) { }

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

}
