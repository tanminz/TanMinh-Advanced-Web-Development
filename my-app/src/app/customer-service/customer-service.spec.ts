import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerService } from './customer-service';

describe('CustomerService', () => {
  let component: CustomerService;
  let fixture: ComponentFixture<CustomerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
