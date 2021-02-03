import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveInfoComponent } from './cognitive-info.component';

describe('SecondScreenComponent', () => {
  let component: CognitiveInfoComponent;
  let fixture: ComponentFixture<CognitiveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CognitiveInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
