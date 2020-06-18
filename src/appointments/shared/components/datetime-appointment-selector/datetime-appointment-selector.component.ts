import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

interface DateTimeSelectorObject {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
}

@Component({
  selector: "datetime-selector",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./datetime-appointment-selector.component.html",
  styleUrls: ["datetime-appointment-selector.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatetimeAppointmentSelectorComponent),
    },
  ],
})
export class DatetimeAppointmentSelectorComponent
  implements ControlValueAccessor {
  hours: number[] = [];
  minutes: number[] = [];
  private onTouch: Function = (): void => {};
  private onModelChange: Function = (_: any): void => {};

  value: Date = new Date();

  get selectedHour() {
    return this.value.getHours();
  }

  get selectedMinute() {
    return this.value.getMinutes();
  }

  selectHour(event: MatSelectChange) {
    this.setSelected({ hour: event.value });
  }

  selectMinute(event: MatSelectChange) {
    this.setSelected({ minute: event.value });
  }

  selectDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) {
      var dateParts = (event.targetElement as HTMLInputElement).value.split(
        "/"
      );
      event.value = new Date(
        +dateParts[2],
        parseInt(dateParts[1]) - 1,
        +dateParts[0]
      );
    }
    const date = {
      year: event.value ? event.value.getFullYear() : this.value.getFullYear(),
      month: event.value ? event.value.getMonth() : this.value.getMonth(),
      date: event.value ? event.value.getDate() : this.value.getDate(),
    };
    this.setSelected(date);
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  writeValue(value: Date) {
    this.value = value;
  }

  setSelected({
    year = this.value.getFullYear(),
    month = this.value.getMonth(),
    date = this.value.getDate(),
    hour = this.value.getHours(),
    minute = this.value.getMinutes(),
  }: DateTimeSelectorObject) {
    const newDateObject = new Date(year, month, date, hour, minute);
    this.value = newDateObject;
    this.onModelChange(newDateObject);
    this.onTouch();
  }

  constructor() {
    this.generateTime("hours", 23);
    this.generateTime("minutes", 59);
  }

  generateTime(unit: string, amount: number) {
    let number = 0;
    while (number <= amount) {
      unit === "hours" ? this.hours.push(number) : this.minutes.push(number);
      number++;
    }
  }
}
