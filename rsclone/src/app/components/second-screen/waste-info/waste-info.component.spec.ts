import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteInfoComponent } from './waste-info.component';

describe('WasteInfoComponent', () => {
  let component: WasteInfoComponent;
  let fixture: ComponentFixture<WasteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
