import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com/user';
  private token : string;

  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'my-auth-token'
    })
  };

  constructor(private cookieService : CookieService, private http : HttpClient) { 
  }

  getAllUsers() : Observable<any> {
    this.updateToken();
    return this.http.get<User>(this.url + '/all', this.httpOptions);
  }

  getBankUsers() : Observable<any> {
    this.updateToken();
    return this.http.get<User>(this.url+'/bank', this.httpOptions);
  }

  private updateToken() {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
  }
}
