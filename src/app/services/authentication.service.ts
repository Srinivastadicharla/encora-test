import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}
  public url: string = `https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users`;
  login(username: string, password: string) {
    return this.http.get<any>(this.url);
  }
}
