import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  
  data : any = [];

  constructor(private dashboardService : DashboardService, private router : Router) { }

  ngOnInit(): void {
    this.dashboardService.getServices().subscribe(
      (response) => { 
        console.log(response) 
        this.data = response;
      },
      (error : HttpErrorResponse) => { 
         console.log(error.error.information_message)
      } 
    )
  }

  onClick(serviceId : number, type : string) {
    switch(type) {
      case "Cuenta de ahorro": case "Cuenta monetaria":
        this.router.navigate(['/client/account_statement',serviceId]);
      break;
      case "Tarjeta de debito":
      break;
      default:
    }
  }

}
