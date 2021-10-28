import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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

  getAllRequests() : Observable<any> {
    this.updateToken();
    return this.http.get(this.url+'/get_all', this.httpOptions);
  }

  getRequestByType(type : number) : Observable<any> {
    let body = {request_type : type};
    this.updateToken();
    return this.http.get<Request>(this.url+'/get_all',{headers: this.httpOptions.headers, params: body});
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
