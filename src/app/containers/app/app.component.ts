import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AuthService,
  User,
} from "../../../auth/shared/services/auth/auth.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "../../../store";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "turnos";

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe();
    this.user$ = this.store.select("user");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(["/"]);
  }
}
