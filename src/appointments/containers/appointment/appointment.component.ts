import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { AppointmentsService } from "../../shared/services/appointments/appointments.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Store } from "../../../store";
import { User } from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent implements OnInit, OnDestroy {
  user: User;
  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  appointments$: Observable<any>;
  subscription: Subscription[] = [];

  ngOnInit(): void {
    this.subscription.push(this.appointmentsService.appointments$.subscribe());
    this.subscription.push(
      this.store.select("user").subscribe((user) => (this.user = user))
    );
    this.appointments$ = this.route.params.pipe(
      switchMap((param) => this.appointmentsService.getAppointment(param.id))
    );
  }

  addAppointment(event) {
    this.appointmentsService.addAppointment({
      appointment: event,
      user: this.user,
    });
    this.backToAppointments();
  }

  updateAppointment(event) {
    const id = this.route.snapshot.params.id;
    this.appointmentsService.updateAppointment({
      id,
      data: event,
      user: this.user,
    });
    this.backToAppointments();
  }

  async removeAppointment() {
    const id = this.route.snapshot.params.id;
    await this.appointmentsService.removeAppointment({ id, user: this.user });
    this.backToAppointments();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  backToAppointments() {
    this.router.navigate(["appointments"]);
  }
}
