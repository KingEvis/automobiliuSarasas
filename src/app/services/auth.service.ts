import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../models/authResponseData';
import { Observable, tap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public idToken:string|null = "";
  constructor(private http:HttpClient) {
    this.idToken = localStorage.getItem('token');
    console.log(this.idToken);
  }


  public login(email:string, password:string, isLogin:boolean){

      const authType=isLogin?"signInWithPassword":"signUp";



      console.log(authType);
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+authType+'?key=AIzaSyD66QbH2mDnGMi7ly7Gf70bDWcF2csnbwk',{
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(tap((response)=>{
        localStorage.setItem('token', response.idToken);
      }));

  }
  public getToken():Observable<string>{
    return of(localStorage.getItem('token')!);
  }
}
