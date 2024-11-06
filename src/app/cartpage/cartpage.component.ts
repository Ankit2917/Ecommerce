import { Component } from '@angular/core';
import { Cart, Product } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { JwtAuthService } from '../Service/jwt-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent {

  cartlist: Cart[] | undefined;



  TotalPrice: number = 0;
  TotalPricewithShipp: number = 0;
  cart: number | undefined;
  value: number = 1;
  constructor(private service: ServiceService, private jwt: JwtAuthService) { }
  ngOnInit() {
    debugger
    let user = this.jwt.GetUserInfo();
    this.service.GetUserCartAllDB(user.UserId).subscribe((data: Cart[]) => {

      this.cartlist = data;
      this.CalulcateTotalPrice();

    })
  }

  DeleteFromCart(id: number) {

    if (id != 0) {
      let user = this.jwt.GetUserInfo();

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.DeleteCartproduct(id).subscribe((data => {

            this.service.GetUserCartAllDB(user.UserId).subscribe((data: Cart[]) => {
              this.cartlist = data;
              this.cart = data.length;
              this.CalulcateTotalPrice()
              this.service.GetUserCartDB(user.UserId);

            })
          }))

        }
      });


    }
  }

  CalulcateTotalPrice() {
    this.TotalPrice = 0;
    this.cartlist?.forEach((item) => {
      this.TotalPrice += item.price
    })

  }
  SubtractQuantityinCart(id: number) {

    if (id != null) {
      this.service.SubtractQuantityinCart(id).subscribe((res) => {
        let user = this.jwt.GetUserInfo();
        this.service.GetUserCartAllDB(user.UserId).subscribe((data: Cart[]) => {

          debugger
          this.cartlist = data;
          this.CalulcateTotalPrice();

        })
      })
    }
  }
  AddQuantityinCart(id: number) {
    this.service.AddQuantityinCart(id).subscribe((res) => {
      let user = this.jwt.GetUserInfo();
      this.service.GetUserCartAllDB(user.UserId).subscribe((data: Cart[]) => {
        this.cartlist = data;
        this.CalulcateTotalPrice();
      })
    })

  }


}
