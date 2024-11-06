import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

 
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SelleraddProductComponent } from './selleradd-product/selleradd-product.component';
import { SellerlistProductComponent } from './sellerlist-product/sellerlist-product.component';
import { SellerupdateProductComponent } from './sellerupdate-product/sellerupdate-product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { WordLimitPipe } from './word-limit.pipe';
 
 
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SellerAuthComponent,
    SelleraddProductComponent,
    SellerlistProductComponent,
    SellerupdateProductComponent,
    ProductdetailComponent,
    UserAuthComponent,
    CartpageComponent,
    CheckoutComponent,
    OrderComponent,
    WordLimitPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
     
    provideClientHydration(),
    provideHttpClient(withFetch()),
     
     
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
