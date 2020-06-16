import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: FormGroup) {
    const { email, password } = form.value;
    await this.authService.loginUser({ email, password });
    this.router.navigate(["/"]);
  }
}
