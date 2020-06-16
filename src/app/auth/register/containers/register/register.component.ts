import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: FormGroup) {
    const { email, password } = form.value;
    await this.authService.registerUser({ email, password });
    this.router.navigate(["/"]);
  }
}
