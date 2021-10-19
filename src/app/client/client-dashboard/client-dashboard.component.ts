import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  
  data : any = [];

  constructor(private dashboardService : DashboardService) { }

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

  setHiddenValue(type : string) : boolean {
    switch(type) {
      case "Cuenta bancaria":
        return true; 
      case "Tarjeta de debito":
        return false;
      default:
        return false;
    }
  }

}
