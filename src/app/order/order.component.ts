import { Component } from '@angular/core';
import { orders, ordersDTO } from '../models/models';
import { ServiceService } from '../Service/service.service';
import { JwtAuthService } from '../Service/jwt-auth.service';
 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orderlist:ordersDTO[] | undefined
  constructor(private service:ServiceService , private jwt:JwtAuthService){}

  ngOnInit(){
    let user = this.jwt.GetUserInfo();
    this.service.GetAllOrder(user.UserId).subscribe((data:ordersDTO[])=>{
      debugger
       this.orderlist = data;
    })
  }

}
