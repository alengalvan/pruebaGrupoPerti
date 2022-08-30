import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebClientService {

  public token: string = null;
  constructor( public http: HttpClient, private router: Router ) { }


  HttpGet(servicio: string): Observable<any> {
    return this.http.get<any>(servicio, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      })
    }).pipe(
      map((resultado) => resultado)
    );
  }

  public getAsync(url: string) {
    return new Promise((resolve, reject) => {
      this.HttpGet(url).subscribe(
        response => {
          resolve(response);
        }, err => {
          resolve(null)
        }
      );
    });
  }

}
