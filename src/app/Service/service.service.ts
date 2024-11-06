import { HttpClient } from '@angular/common/http';
import {  EventEmitter, Injectable } from '@angular/core';
import { Cart, orders, ordersDTO, SellerSignup, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http: HttpClient) { }
  cartUpdateDB = new EventEmitter<Cart[] | []>();

  AddSeller(seller: SellerSignup) {

    return this.http.post("https://localhost:7241/api/seller", seller);
  }

  SellerLogin(seller: SellerSignup) {

    return this.http.post("https://localhost:7241/api/token/SellerToken", seller)
  }

  AddUser(user: User) {

    return this.http.post("https://localhost:7241/api/user", user);
  }
  LoginUser(user: User) {

    return this.http.post("https://localhost:7241/api/token/UserToken", user);
  }

  LoginUserCart(Cart: Cart) {

    return this.http.post("https://localhost:7241/api/Cart/LoginCart", Cart);
  }

  GetUserCartDB(userId:number){
    return this.http.get<Cart[]>(`https://localhost:7241/api/Cart/GetUserCart?UserId=${userId}`).subscribe((data:Cart[])=>{
      this.cartUpdateDB.emit(data);
    })
  }

  GetUserCartAllDB(userId:number){
    return this.http.get<Cart[]>(`https://localhost:7241/api/Cart/GetUserCart?UserId=${userId}`);
  }


  AddQuantityinCart(id:number){
    return this.http.get<Cart[]>(`https://localhost:7241/api/Cart/AddQuantityinCart?id=${id}`);
  }

  SubtractQuantityinCart(id:number){
    return this.http.get<Cart[]>(`https://localhost:7241/api/Cart/SubtractQuantityinCart?id=${id}`);
  }


  AddtoCartDB(cart:Cart){
    return this.http.post("https://localhost:7241/api/Cart/AddtoCartDB",cart) ;
  }

  DeleteCartproduct(id:number){

    return this.http.delete(`https://localhost:7241/api/Cart/DeletefromCart?id=${id}`) ;

  }

  AddOrder(order:orders){

    return this.http.post('https://localhost:7241/api/order/AddOrder',order);
  }

  GetAllOrder(Userid:number){
    return this.http.get<ordersDTO[]>(`https://localhost:7241/api/order/GetAllOrder?id=${Userid}`);
  }

  DeleteCartAllUser(Userid:number){
      return this.http.delete(`https://localhost:7241/api/Cart/DeleteUserCartAll?id=${Userid}`)
  }

  DeleteFromCart(id:number,userid:number){
    return this.http.delete(`https://localhost:7241/api/Cart/DeletefromCart?id=${id}&userid=${userid}`)
  }

}

