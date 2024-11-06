import { Component } from '@angular/core';
import { Cart, orders } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { JwtAuthService } from '../Service/jwt-auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartlist: Cart[] | undefined;
  constructor(private service: ServiceService, private jwt: JwtAuthService , private router:Router) { }
  price: number = 0;
  order: orders = {
    id: 0,
    name: '',
    price: '',
    Address: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    phonenumber: '',
    email: 'a',
    Userid: 0,
    user: {
      name: '',
      email: '',
      password: '',
      role: '',
      id: 0
    }
  }

  ngOnInit() {
    let user = this.jwt.GetUserInfo();
    this.service.GetUserCartAllDB(user.UserId).subscribe((data: Cart[]) => {
      this.cartlist = data;
      this.CalulcateTotalPrice()
    })
  }

  placeorder() {
    let user = this.jwt.GetUserInfo();
    this.order.Userid = parseFloat(user.UserId);
    this.order.price = this.price.toString();

    this.service.AddOrder(this.order).subscribe((data => {
      this.service.DeleteCartAllUser(user.UserId).subscribe((data) => {
        this.service.GetUserCartDB(user.UserId);
        Swal.fire({
          title: "Order placed succesfully.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then((result)=>{
            this.router.navigate(['order'])
        });
      })
    }
    ))
  }

  CalulcateTotalPrice() {
    this.price = 0
    this.cartlist?.forEach((item) => {
      this.price += item.price
    })

  }

}

 