import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Account } from './account';
import { AccountRequest } from './account-request/account-request';
import { CreditCardRequest } from './credit-card-request/credit-card-request';

@Injectable()
export class RequestService {

  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com/request';
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

  sendAccountRequest(account : AccountRequest) : Observable<any> {
    this.updateToken();
    return this.http.post<AccountRequest>(this.url + '/account', JSON.stringify(account) ,this.httpOptions);
  }

  sendCreditCardRequest(creditCardRequest : CreditCardRequest) : Observable<any> {
    this.updateToken();
    return this.http.post<CreditCardRequest>(this.url+'/credit_card',JSON.stringify(creditCardRequest),this.httpOptions);
  }

  private updateToken() {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
  }
}
