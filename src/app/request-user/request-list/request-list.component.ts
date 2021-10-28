import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  id : any;
  page : any;
  requests : any = [];

  constructor(private requestService : RequestService , private actRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getRouteParam();
  }

  /**
   * gets account id param sent in url,
   * in a dynamic way.
   */
   getRouteParam() {
    this.actRoute.paramMap.subscribe(
      (param) => {
        this.id = param.get('id');
        this.getRequest();
      }
    );
  }

  getAllRequests() {
    this.requestService.getAllRequests().subscribe(
      (response) => {
        this.requests = response;
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    );
  }

  getRequestByType() {
    this.requestService.getRequestByType(this.id).subscribe(
      (response) => {
        this.requests = response;
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    );
  }

  getRequest() {
    console.log(this.id);
    if(this.id === '0') {
      this.getAllRequests();
    } else {
      this.getRequestByType();
    }
  }

}
