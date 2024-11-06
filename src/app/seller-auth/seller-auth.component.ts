import { Component } from '@angular/core';
import { Seller, SellerLogin, SellerSignup } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  constructor(private service:ServiceService,private route:Router) {}
  toggle: boolean = false;
  loginfailed: string | undefined;
  sellerlogin: SellerLogin = {
    email: '',
    password: ''
  }
  sellerSignup: SellerSignup = {
    name: '',
    email: '',
    password: '',
    id: 0,
    Role: ''
  }
  seller:Seller={
    Role: '',
    SellerName: '',
    SellerId: '',
    SellerEmail: '',
    id: 0
  }
  openLogin() {
    this.toggle = true;
  }
  openSignup() {
    this.toggle = false;
  }
  Signup() {
    this.service.AddSeller(this.sellerSignup).subscribe((data)=>{
      this.loginfailed = "Created Successfully";
       this.route.navigate(["/"]);
    })
  }
  
  Login() {
    
     this.service.SellerLogin(this.sellerSignup).subscribe((data : any)=>{
       
      if(data){
        
        this.loginfailed = "login successfully";
        if (typeof window !== "undefined") {
          localStorage.setItem('token',data.token)
      }
        this.route.navigate(["/"]);
        
      }
      else{
        this.loginfailed = "Something Wrong";
      }
     })
  }
}
