import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Productservice } from '../Service/productservice';
import { Cart, Product } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { JwtAuthService } from '../Service/jwt-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent {

  id: number | undefined;
  product: Product | undefined;
  token: string | undefined | null;
  value: number = 1;
  productinCart = false;
  cart: Product[] | undefined;
  DBCart: Cart = {
    id: 0,
    userid: 0,
    user: null,
    productid: 0,
    product: null,
    price: 0,
    quantity: 0
  }
  constructor(private route: ActivatedRoute, private service:
    Productservice, private routerac:
      ActivatedRoute, private service2: ServiceService,
    private jwt: JwtAuthService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.id = parseInt(id);
    this.token = localStorage.getItem('token');
    if (id)
      this.service.GetProductById(id).subscribe((data) => {
        this.product = data;
      })
    this.routerac.params.subscribe(params => {

      let number = +params['id'];
      this.service.GetProductById(number.toString()).subscribe((data) => {

        this.product = data;
      }
      )
    });

    let user = localStorage.getItem('user');
    let parsedUser = user && JSON.parse(user);
    if (id) {
      if (!user) {
        this.GetfilterCartbyid(parseInt(id));
      }
      else {
         
      }
    }

  }

  GetfilterCartbyid(id: number) {

    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      this.cart = JSON.parse(cartdata);
      let filtereddata = this.cart?.filter((item) => item.id === id) || [];
      if (filtereddata.length > 0) {
        this.productinCart = true;
      }
      else {

      }

    }
  };

  

  AddtoCart() {
    let price: number = 0;
    if (this.product)

      if (this.product) {
        let user = localStorage.getItem('token');
        let userjwt = this.jwt.GetUserInfo();
        debugger
        if (user) {
          this.DBCart.quantity = this.value;
          this.DBCart.price = this.product.price   
          this.DBCart.productid = this.product.id;
          this.DBCart.userid = parseFloat(userjwt.UserId);
          this.service2.AddtoCartDB(this.DBCart).subscribe((data)=>{
            Swal.fire('Product added in your cart',':)')
            this.service2.GetUserCartDB(this.DBCart.userid);
          })
 
          this.productinCart = true;
        }
        else {
          this.service.LocalAddtoCart(this.product);
          Swal.fire('Product added in your cart',':)')

          this.productinCart = true;

        }

      }


  }

  RemoveFromCart() {

    let user = this.jwt.GetUserInfo();
    if (this.id)
      if (!localStorage.getItem('token')) {
        this.service.RemoveLocalcart(this.id);
        this.productinCart = false;
      }
      else {
        if(this.product?.id)
        this.service2.DeleteFromCart(this.product?.id,user.UserId)
      }
      Swal.fire('Product removed from your cart')
    this.productinCart = false;
  }
}
