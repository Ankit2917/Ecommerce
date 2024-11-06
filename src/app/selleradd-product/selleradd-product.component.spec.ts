import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelleraddProductComponent } from './selleradd-product.component';

describe('SelleraddProductComponent', () => {
  let component: SelleraddProductComponent;
  let fixture: ComponentFixture<SelleraddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelleraddProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelleraddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
