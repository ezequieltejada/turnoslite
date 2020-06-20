import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { firestore } from "firebase";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit, OnChanges {
  @Output() create = new EventEmitter<{
    customer: string;
    dateTime: Date;
  }>();
  @Output() update = new EventEmitter<{
    key: string;
    customer: string;
    dateTime: Date;
  }>();
  @Output() remove = new EventEmitter<void>();
  @Input() appointment;

  form = this.fb.group({
    customer: ["", Validators.required],
    dateTime: [new Date(), [notBeforeNowValidator()]],
  });
  exists: boolean;

  get required(): boolean {
    return (
      this.form.get("customer").touched &&
      this.form.get("customer").value === ""
    );
  }

  get notBeforeNow(): boolean {
    return (
      (this.form.get("dateTime").touched || this.form.get("dateTime").dirty) &&
      this.form.get("dateTime").getError("notBeforeNow") !== null
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appointment && this.appointment.id) {
      this.exists = true;
      const customer: string = this.appointment.customer;
      const dateTime: Date = this.appointment.dateTime.toDate();
      this.form.patchValue({ customer, dateTime });
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onCreate() {
    if (this.form.dirty && this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  onUpdate() {
    if (this.form.dirty && this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  onRemove() {
    this.remove.emit();
  }
}

export function notBeforeNowValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value as Date;
    const now = new Date();
    return value.getTime() < now.getTime()
      ? { notBeforeNow: { value: value } }
      : null;
  };
}
