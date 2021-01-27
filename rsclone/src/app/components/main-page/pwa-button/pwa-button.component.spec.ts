import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaButtonComponent } from './pwa-button.component';

describe('PwaButtonComponent', () => {
  let component: PwaButtonComponent;
  let fixture: ComponentFixture<PwaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwaButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
