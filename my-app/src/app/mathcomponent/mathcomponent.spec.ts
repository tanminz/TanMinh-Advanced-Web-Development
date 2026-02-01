import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mathcomponent } from './mathcomponent';

describe('Mathcomponent', () => {
  let component: Mathcomponent;
  let fixture: ComponentFixture<Mathcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mathcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mathcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
