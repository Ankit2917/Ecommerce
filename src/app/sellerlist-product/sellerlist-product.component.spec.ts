import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerlistProductComponent } from './sellerlist-product.component';

describe('SellerlistProductComponent', () => {
  let component: SellerlistProductComponent;
  let fixture: ComponentFixture<SellerlistProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerlistProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerlistProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
