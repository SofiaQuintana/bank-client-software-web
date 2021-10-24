import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   //link to remote server
   private url = 'https://analisis-bank-server.herokuapp.com/services';
   private token : string;

   //Header declaration (inmutable)
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
   * this function sends an http get request to remote server,
   * to get a list of services or any 401 error.
   * @returns Observable (http response result)
   */
  getServices() : Observable<any> {
    //Se obtiene el token almacenado
    this.token = this.cookieService.get('TOKEN');
    //Se realiza una copia que contiene los cambios incluidos en el token de autorizacion
    this.httpOptions.headers = this.httpOptions.headers.set('token', this.token);
    return this.http.get<Service>(this.url + '/active', this.httpOptions);
  }

}
