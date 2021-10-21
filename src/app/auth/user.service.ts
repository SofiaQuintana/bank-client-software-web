import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './new-user';

@Injectable()
export class UserService {

  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com';
  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    })
  };

  constructor(private http : HttpClient) { }

  sendNewUserData(user : NewUser) : Observable<any> {
    return this.http.post<NewUser>(this.url+'/user',JSON.stringify(user),this.httpOptions);
  }
}
