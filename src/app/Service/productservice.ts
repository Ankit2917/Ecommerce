import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import {  Product } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class Productservice {
  constructor(private http: HttpClient) { }

  cartUpdate = new EventEmitter<Product[] | []>();
  
  AddProduct(product: FormData) {
    return this.http.post("https://localhost:7241/api/product", product);
  }
  GetAllProduct() {
    return this.http.get<Product[]>("https://localhost:7241/api/product");
  }
  GetProductById(id: string) {
    return this.http.get<Product>(`https://localhost:7241/api/product/ProductById?id=${id}`)
  }
  UpdateProduct(product: FormData) {
    return this.http.put("https://localhost:7241/api/product", product);
  }

  DeleteProduct(id: number) {
    return this.http.delete(`https://localhost:7241/api/product?id=${id}`)
  }

  SearchProduct(query: string) {
    return this.http.get<Product[]>(`https://localhost:7241/api/product/Search?query=${query}`)
  }

  LocalAddtoCart(product: Product) {

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([product]));
      this.cartUpdate.emit([product]);
    }
    else {
      let array:Product[];
      let data = localStorage.getItem('cart');
      if (data) {
        array = JSON.parse(data);
        array.push(product);
        localStorage.setItem('cart', JSON.stringify(array));
        this.cartUpdate.emit(array);
      }
    }
  }
  RemoveLocalcart(id: number) {

    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      let cart: Product[] = JSON.parse(cartdata);
 
      let filtereddata = cart.filter(item => item.id !== id)

      localStorage.setItem('cart', JSON.stringify(filtereddata));
      this.cartUpdate.emit(filtereddata);

    }
  }

  GetlocalCart(){
    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      let cart: Product[] = JSON.parse(cartdata);
      this.cartUpdate.emit(cart);
    }
    else{
      this.cartUpdate.emit([]);
    }
  }

  

}
