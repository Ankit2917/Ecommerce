import { Component } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Productservice } from '../Service/productservice';
import { Product } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  productList:Product[] | undefined;
constructor( private service:Productservice){}
  ngOnInit(){

   this.service.GetAllProduct().subscribe((data)=>{
    this.productList = data;
   })
  }
}
