import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../auth/user';
import { Transaction } from './transaction-list/transaction';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com/user';
  private specialUrl = 'https://analisis-bank-server.herokuapp.com/account';
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

  /**
   * 1. Updates stored token and is assigned to header
   * 2. Makes an http get request, expecting to get a list of users stored on db
   * @returns Observable<any>
   */
  getAllUsers() : Observable<any> {
    this.updateToken();
    return this.http.get<User>(this.url + '/all', this.httpOptions);
  }

  /**
   * 1. Updates stored token and is assigned to header
   * 2. Makes an http get request, expecting to get a list of bank users stored on db
   * @returns Observable<any>
   */
  getBankUsers() : Observable<any> {
    this.updateToken();
    return this.http.get<User>(this.url+'/bank', this.httpOptions);
  }

  /**
   * 1. Updates stored token and is assigned to header
   * 2. Makes an http get request, expecting to get a list of disabled users stored on db
   * @returns Observable<any>
   */
  getDisabledUsers() : Observable<any> {
    this.updateToken();
    return this.http.get<User>(this.url+'/denied',this.httpOptions);
  }

  /**
   * 1. Creates a json body with username
   * 2. Updates stored token and is assigned to header
   * 2. Makes an http put request, expecting to revoke access to sent user
   * @returns Observable<any>
   */
  revokeUserAccess(username : string) : Observable<any> {
    let body = {username: username};
    this.updateToken();
    return this.http.put(this.url+'/revoke_access',body, this.httpOptions);
  }

  getTransactions(username : string) : Observable<any> {
    let body = {username: username};
    this.updateToken();
    return this.http.get<Transaction>(this.specialUrl + '/get_all_transactions_by_an_user', {headers: this.httpOptions.headers, params: body});
  } 

  /**
   * 1. gets token stored on cookies
   * 2. sets values into a new header
   */
  private updateToken() {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
  }
}
