import { Component, EventEmitter } from '@angular/core';
import { Cart, Product, User, UserLogin } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { JwtAuthService } from '../Service/jwt-auth.service';
import Swal from 'sweetalert2';
 
 
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private service:ServiceService, private router:Router,private jwt: JwtAuthService){}
  cartUpdate = new EventEmitter<Cart[] | []>();

  toggle: boolean = false;
  user:User={
    name: '',
    email: '',
    password: '',
    role: '',
    id: 0
  }
  userlogin:UserLogin={
    email: '',
    password: ''
  }
  loginfailed:string | undefined;
  Signup(){
     
   this.service.AddUser(this.user).subscribe((data)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Registered Successfully",
      showConfirmButton: false,
      timer: 1000
    })
  this.router.navigate(["/"]);
   })
  }
  openSignup(){
    this.toggle = false;
    this.loginfailed = "";
  }
  openLogin(){
    this.toggle = true;
    this.loginfailed = "";
  }
  Login(){
     
    this.user.email = this.userlogin.email;
    this.user.password = this.userlogin.password;
    
    this.service.LoginUser(this.user).subscribe((data:any)=>{

      if(data){
        
        this.loginfailed = "login successfully";
        if (typeof window !== "undefined") {
          localStorage.setItem('token',data.token)
          let userjwt = this.jwt.GetUserInfo();
          if(localStorage.getItem('cart')){
            
            let cart = localStorage.getItem('cart');
              
            if(cart){
              let cartProduct:Product[] = JSON.parse(cart);
               
              let user:User = {
                name: '',
                email: '',
                password: '',
                role: '',
                id: userjwt.UserId
              }

              cartProduct.forEach((product)=>{
                debugger
                let cart:Cart ={
                  id: 0,
                  userid: user.id,
                  user: null,
                  productid: product.id,
                  product: null,
                  price: product.price,
                  quantity: 1
                }

                this.service.LoginUserCart(cart).subscribe((data)=>{
                
                })
              })
               
              localStorage.removeItem('cart');
             
              
            } 
          }
          this.service.GetUserCartDB(userjwt.UserId);
        }
         
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Logged In Successfully",
          showConfirmButton: false,
          timer: 1000
        })
        
        this.router.navigate(["/"]);
        
      }
      else{
        this.loginfailed = "Something Wrong";
      }
    })
   
  }
  
}
