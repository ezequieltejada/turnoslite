import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: [""],
    password: [""],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted.emit(this.form);
  }
}
