import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ex3 } from './ex3';

describe('Ex3', () => {
  let component: ex3;
  let fixture: ComponentFixture<ex3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ex3]   // ✅ ĐÚNG
    }).compileComponents();

    fixture = TestBed.createComponent(ex3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
