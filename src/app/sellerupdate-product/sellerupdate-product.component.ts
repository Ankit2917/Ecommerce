import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productservice } from '../Service/productservice';
import { Product } from '../models/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellerupdate-product',
  templateUrl: './sellerupdate-product.component.html',
  styleUrl: './sellerupdate-product.component.css'
})
export class SellerupdateProductComponent {
  constructor(private route: ActivatedRoute, private service: Productservice , private router1:Router) { }
  selectedFile: File | null = null;
  updatedmsg: string | undefined;
  product: Product = {
    id: 0,
    name: '',
    colour: '',
    description: '',
    imageurl: null,
    price: 0
  }
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.service.GetProductById(id).subscribe((data) => {
        this.product = data;
         
      })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submit(product: Product) {
     
    if (product.id != 0) {
      var formdata = new FormData();
      formdata.append('name', product.name);
      formdata.append('colour', product.colour);
      formdata.append('description', product.description);
      formdata.append('price', product.price.toString());
      if (this.selectedFile != null){
        formdata.append('imageurl', this.selectedFile, this.selectedFile?.name);
      }
     
      formdata.append('id', product.id.toString())
      this.service.UpdateProduct(formdata).subscribe((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Updated Successfully",
          showConfirmButton: false,
          timer: 1000
        })
        this.router1.navigate(["sellerlist"]);
      })
    }


  }
}
