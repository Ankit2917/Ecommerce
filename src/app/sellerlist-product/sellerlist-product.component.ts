import { Component } from '@angular/core';
import { Product } from '../models/models';
import { Productservice } from '../Service/productservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellerlist-product',
  templateUrl: './sellerlist-product.component.html',
  styleUrl: './sellerlist-product.component.css'
})
export class SellerlistProductComponent {
  constructor(private service: Productservice) { }
  productlist: Product[] | undefined

  ngOnInit() {
    this.GetAllProduct();
  }

  GetAllProduct() {
    this.service.GetAllProduct().subscribe((data) => {
      this.productlist = data;
    })
  }

  Delete(id: number) {
 
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
        this.service.DeleteProduct(id).subscribe((data) => {
       
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.GetAllProduct();
        })
    
      }
    });
   
 
  }

  

}
