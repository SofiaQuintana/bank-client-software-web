import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  //REST authentication services handler
  private isLoggedIn = false;
  //session token
  private token : string;
  //link to remote server
  private url = 'https://analisis-bank-server.herokuapp.com';
  //Header declaration
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'token': 'my-auth-token'
    })
  };

  constructor(private cookieService : CookieService, private http : HttpClient) { 
  }

  /**
   * Executes a post http request for login data 
   * @param user 
   * @returns Observable<T>
   */
  sendLoginData(user : User): Observable<any> {
    return this.http.post<User>(this.url+'/login', JSON.stringify(user), this.httpOptions);
  }

  /**
   * 1. gets session token stored on cookies
   * 2. makes a copy of declared headers updating session token to new token
   * 3. makes a post http request for logout
   * @returns Observable<T>
   */
  logout(): Observable<any> {
    this.token = this.cookieService.get('TOKEN');
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
    return this.http.post<string>(this.url+'/logout','',this.httpOptions);
  }

  /**
   * Registers logged, token, username and role cookies
   * @param role 
   * @param token 
   * @param username 
   */
  registerLogInData(role : number, token : string, username : string) {
    this.cookieService.set('LOGGED', 'true');
    this.cookieService.set('TOKEN', token);
    this.cookieService.set('USERNAME', username);
    this.setRole(role);
  }

  /**
   * Registers a role string value depending on role id
   * @param role 
   */
  setRole(role : number) {
    switch(role) {
      case 1: 
        this.cookieService.set('ROLE', 'cliente');
      break;
      case 2:
        this.cookieService.set('ROLE', 'cajero');
      break;
      case 3:
        this.cookieService.set('ROLE', 'solicitudes');
      break;
      case 4:
        this.cookieService.set('ROLE', 'administrador');
      break;
    }
  }

  //---------------------------------getters for cookie values----------------------------------
  getRole() : string {
    const role = this.cookieService.get('ROLE');
    return role;
  }

  getToken() : string {
    const token = this.cookieService.get('TOKEN');
    return token;
  }

  getUsername() : string {
    const username = this.cookieService.get('USERNAME');
    return username;
  }

  /**
   * 1. Obtains logged value stored on cookies
   * 2. if values is true
   *  2.1 sets a logged true value
   * 3. if value is false
   *  3.1 sets a logged false value
   * @returns boolean
   */
  isLogged() : boolean {
    const loggedIn = this.cookieService.get('LOGGED');
    if(loggedIn == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    return this.isLoggedIn;
  }

  /**
   * 1. Updates logged cookie value to false
   * 2. Deletes any other cookie value stored
   */
  clearCookies() {
    this.cookieService.deleteAll();
  }

}
