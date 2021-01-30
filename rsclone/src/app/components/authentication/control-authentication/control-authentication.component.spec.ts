import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAuthenticationComponent } from './control-authentication.component';

describe('ControlAuthenticationComponent', () => {
  let component: ControlAuthenticationComponent;
  let fixture: ComponentFixture<ControlAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
