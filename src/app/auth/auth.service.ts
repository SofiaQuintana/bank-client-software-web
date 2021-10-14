import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  //REST authentication services handler
  private isLoggedIn = false;

  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com';
  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'null',
      'Access-Control-Allow-Origin': '*' 
    })
  };

  constructor(private cookieService : CookieService, private http : HttpClient) { 
    cookieService.set('LOGGED', 'false');
  }

  sendLoginData(user : User): Observable<any> {
    return this.http.post<User>(this.url+'/login', JSON.stringify(user), this.httpOptions);
  }

  registerLogInData(role : number) {
    this.cookieService.set('LOGGED', 'true');
    this.setRole(role);
  }

  setRole(role : number) {
    switch(role) {
      case 1: 
        this.cookieService.set('ROLE', 'cliente');
        break;
      case 2:
        this.cookieService.set('ROLE', 'cajero');
        break;
    }
  }

  getRole() : string {
    const role = this.cookieService.get('ROLE');
    return role;
  }

  isLogged() : boolean {
    const loggedIn = this.cookieService.get('LOGGED');
    if(loggedIn == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    return this.isLoggedIn;
  }
}
