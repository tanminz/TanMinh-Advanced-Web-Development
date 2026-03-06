import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookupdate } from './bookupdate';

describe('Bookupdate', () => {
  let component: Bookupdate;
  let fixture: ComponentFixture<Bookupdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookupdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookupdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
