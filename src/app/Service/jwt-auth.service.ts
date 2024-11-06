import { Injectable } from '@angular/core';
import *  as jwt_decode from 'jwt-decode';
 
 

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  constructor(  ) { }
  decodedToken: any;
  getToken() {
    return localStorage.getItem("token");
  }

  GetUserInfo(){
    let token = this.getToken();
    if(token){
      this.decodedToken = jwt_decode.jwtDecode(token);
       return this.decodedToken;
    }
  }
  isTokenExpired(){
    const token = this.getToken();
    // return this.jwtHelper.isTokenExpired(token);
  } 
}
