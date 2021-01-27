import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjectButtonComponent } from './new-object-button.component';

describe('NewObjectButtonComponent', () => {
  let component: NewObjectButtonComponent;
  let fixture: ComponentFixture<NewObjectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewObjectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObjectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
