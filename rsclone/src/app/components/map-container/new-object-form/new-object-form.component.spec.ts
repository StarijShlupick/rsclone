import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjectFormComponent } from './new-object-form.component';

describe('NewObjectFormComponent', () => {
  let component: NewObjectFormComponent;
  let fixture: ComponentFixture<NewObjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewObjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
