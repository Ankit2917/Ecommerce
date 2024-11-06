import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerupdateProductComponent } from './sellerupdate-product.component';

describe('SellerupdateProductComponent', () => {
  let component: SellerupdateProductComponent;
  let fixture: ComponentFixture<SellerupdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerupdateProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerupdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
