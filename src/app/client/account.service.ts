import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Account } from './account';

@Injectable()
export class AccountService {

   //link to remote server
   private url = 'https://analisis-bank-server.herokuapp.com/account';
   private token : string;

   //Header declaration
   httpOptions = {
     headers : new HttpHeaders({
       'Content-Type': 'application/json',
       'token': 'my-auth-token'
     })
   };

  constructor(private cookieService : CookieService, private http : HttpClient) { 
  }

  getAccountInfo(id : number) : Observable<Account> {
    let body = {id_account: id};
    this.updateToken();
    return this.http.get<Account>(this.url + '/statement', {headers: this.httpOptions.headers, params: body});
  }

  updateToken() {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
  }

}