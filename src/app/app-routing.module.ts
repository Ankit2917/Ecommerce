import { NgModule } from '@angular/core';
 
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SelleraddProductComponent } from './selleradd-product/selleradd-product.component';
import { SellerlistProductComponent } from './sellerlist-product/sellerlist-product.component';
import { SellerupdateProductComponent } from './sellerupdate-product/sellerupdate-product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:"navbar",component:NavbarComponent},
  {path:"",component:DashboardComponent},
  {path:"sellerAuth",component:SellerAuthComponent},
  {path:"sellerlist",component:SellerlistProductComponent},
  {path:"selleraddProduct",component:SelleraddProductComponent},
  {path:"sellerupdate/:id",component:SellerupdateProductComponent},
  {path:"productdetail/:id",component:ProductdetailComponent},
  {path:"userauth",component:UserAuthComponent},
  {path:"cart",component:CartpageComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"order",component:OrderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
