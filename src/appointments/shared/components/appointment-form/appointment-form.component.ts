import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormGroup,
} from "@angular/forms";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<{
    customer: string;
    dateTime: Date;
  }>();
  @Output() cancelled = new EventEmitter<void>();

  form = this.fb.group({
    customer: ["", Validators.required],
    dateTime: [new Date(), [notBeforeNowValidator()]],
  });

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.dirty && this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  onCancel() {
    this.form.reset({
      customer: "",
      dateTime: new Date(),
    });
    this.cancelled.emit();
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
