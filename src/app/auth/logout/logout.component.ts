import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: '<br>'
})
export class LogoutComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  /**
   * on init
   * 1. calls logout request
   * 2. if status 200
   *  2.1 call clear cookie func
   *  2.2 redirects to login
   * 3. if error >400
   *  3.1 prints error on console
   */
  ngOnInit(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log(response);
        this.authService.clearCookies();
        this.router.navigate(['/login']);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    )  
  }

}
