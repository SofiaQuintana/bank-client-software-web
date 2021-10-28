import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CreditCardPayment } from './credit-card-payment/credit-card-payment';
import { Deposit } from './deposit/deposit';
import { LoanPayment } from './loan-payment/loan-payment';
import { Transfer } from './transfer/transfer';
import { Withdrawal } from './withdrawal/withdrawal'

@Injectable()
export class OperationService {

  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com/';
  private token : string;

  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'my-auth-token'
    })
  };

  constructor(private cookieService : CookieService, private http : HttpClient) {
    this.setToken()
  }

  requestDeposit(deposit: Deposit): Observable<any> {
    this.setToken();
    return this.http.post<Deposit>(this.url + 'account/deposit', JSON.stringify(deposit) ,this.httpOptions)
  }
  
  requestWithdrawal(withdrawal: Withdrawal): Observable<any> {
    this.setToken();
    return this.http.post<Withdrawal>(this.url + 'account/withdrawal', JSON.stringify(withdrawal) ,this.httpOptions);
  }

  requestTransfer(transfer: Transfer): Observable<any> {
    this.setToken();
    return this.http.post<Transfer>(this.url + 'account/transfer_on_app', JSON.stringify(transfer) ,this.httpOptions);
  }
  
  requestLoanPayment(payment: LoanPayment): Observable<any> {
    this.setToken();
    return this.http.post<LoanPayment>(this.url + 'loan/payment', JSON.stringify(payment) ,this.httpOptions);
  }

  requestCreditCardPayment(payment: CreditCardPayment): Observable<any> {
    this.setToken();
    return this.http.post<CreditCardPayment>(this.url + 'card/credit_payment', JSON.stringify(payment) ,this.httpOptions);
  }

  private setToken() {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
  }
}
