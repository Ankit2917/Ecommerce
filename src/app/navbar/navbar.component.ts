import { Component } from '@angular/core';
import { JwtAuthService } from '../Service/jwt-auth.service';
import { Product, Seller } from '../models/models';
import {  Router } from '@angular/router';
import { Productservice } from '../Service/productservice';
import { ServiceService } from '../Service/service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {

  url: string = "default";
  queryresult: string | undefined;
  Seller: Seller | undefined
  productlist:Product[] | undefined;
  cartNumber:number | undefined;

  constructor(private jwt: JwtAuthService, private route: Router , private service:Productservice,private service2:ServiceService ) { }
  ngOnInit() {
 
    this.route.events.subscribe((response: any) => {
      if (response.url) {
          
        let Logger = this.jwt.GetUserInfo();
        if ( Logger && Logger.Role == "Seller") {
          this.Seller = Logger;
          if (this.Seller && this.Seller.Role == "Seller") {
            this.url = "Seller"
          }
        }
        else if ( Logger && Logger.Role == "User") {
          this.url = "User";
        }
        else{
          this.url="default";
        }
        
      }
    })
 
    let userjwt = this.jwt.GetUserInfo();
     
    if(!localStorage.getItem('token')){
      this.service.GetlocalCart();
    }
    else{
      this.service2.GetUserCartDB(userjwt.UserId);
    }
    this.service.cartUpdate.subscribe((items:any) => {
         this.cartNumber = items.length;
    });

     this.service2.cartUpdateDB.subscribe((item:any)=>{
       
      this.cartNumber = item.length;
     })




   
  }
  searchsubmit(value: string) { }
  logout(): void {
     debugger
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    this.cartNumber = 0;
    this.route.navigate(["/"]);
  }

  getdata() {
    let logger = this.jwt.getToken();
    if (logger) {
      return true;
    }
    return false
  }

  search(event: KeyboardEvent) {
    if (event) {
      let keyboard = event.target as HTMLInputElement;
      this.service.SearchProduct(keyboard.value).subscribe((data)=>{
         this.productlist = data;
          
      })
   }
  }

  hideProducts(event: FocusEvent) {
     this.productlist = undefined;
   }

}
