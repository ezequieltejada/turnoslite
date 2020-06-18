import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeAppointmentSelectorComponent } from './datetime-appointment-selector.component';

describe('DatetimeAppointmentSelectorComponent', () => {
  let component: DatetimeAppointmentSelectorComponent;
  let fixture: ComponentFixture<DatetimeAppointmentSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeAppointmentSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeAppointmentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
