import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async onSubmit(form: FormGroup) {
    const { email, password } = form.value;
    try {
      await this.authService.loginUser({ email, password });
    } catch (error) {
      this._snackBar.open(error.message, "", {
        duration: 2000,
      });
      return;
    }

    this.router.navigate(["/"]);
  }
}
