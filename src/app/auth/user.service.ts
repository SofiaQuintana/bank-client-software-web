import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './new-user';
import { PasswordReset } from './password-reset';

@Injectable()
export class UserService {

  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com/user';
  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    })
  };

  constructor(private http : HttpClient) { }

  /**
   * Function used to send a new user data in a post http request to remote server
   * @param user 
   * @returns 
   */
  sendNewUserData(user : NewUser) : Observable<any> {
    return this.http.post<NewUser>(this.url,JSON.stringify(user),this.httpOptions);
  }

  /**
   * Function used to send user 'username' to remote server in a put http request
   * to remote server, this functios is just for password resets.  
   * @param username 
   * @returns 
   */
  resetPassword(username : PasswordReset) : Observable<any> {
    return this.http.post<PasswordReset>(this.url+'/password_recovery',JSON.stringify(username),this.httpOptions);
  }
}
