import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js';
import 'zone.js/testing';

import { TraceScss } from './trace-scss';

describe('TraceScss', () => {
  let component: TraceScss;
  let fixture: ComponentFixture<TraceScss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceScss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceScss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
