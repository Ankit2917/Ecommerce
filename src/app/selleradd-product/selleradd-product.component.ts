import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Productservice } from '../Service/productservice';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
 
 
 


@Component({
  selector: 'app-selleradd-product',
  templateUrl: './selleradd-product.component.html',
  styleUrl: './selleradd-product.component.css'
})
export class SelleraddProductComponent {

  addedMsg: string | undefined;
  productForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private service: Productservice,private Router1:Router) {
    this.productForm = fb.group({
      name: [''],
      price: [''],
      description: [''],
      colour: [''],

    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    debugger
    var formdata = new FormData();
    if (this.productForm.valid && this.selectedFile) {

      formdata.append('id', "0")
      formdata.append('name', this.productForm.get('name')?.value)
      formdata.append('colour', this.productForm.get('colour')?.value)
      formdata.append('description', this.productForm.get('description')?.value)
      formdata.append('price', this.productForm.get('price')?.value)
 
      if (this.selectedFile) {
        formdata.append('imageurl', this.selectedFile, this.selectedFile.name);
      }
 
      this.service.AddProduct(formdata).subscribe((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added Successfully",
          showConfirmButton: false,
          timer: 1000
        })
     
        this.Router1.navigate(["sellerlist"]);
      
      })

    }
  }
}
