import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learnbinding } from './learnbinding';

describe('Learnbinding', () => {
  let component: Learnbinding;
  let fixture: ComponentFixture<Learnbinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Learnbinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Learnbinding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
