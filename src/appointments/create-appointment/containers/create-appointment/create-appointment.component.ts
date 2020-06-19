import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppointmentsService } from "../../../shared/services/appointments/appointments.service";
import { Subscription, Observable } from "rxjs";
import { Appointment } from "../../../shared/interfaces/appointment.interface";
import { Store, State } from "../../../../store";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-appointment",
  templateUrl: "./create-appointment.component.html",
  styleUrls: ["./create-appointment.component.scss"],
})
export class CreateAppointmentComponent implements OnInit, OnDestroy {
  appointments$: Observable<Appointment[]>;
  subscription: Array<Subscription> = [];
  user: User;

  constructor(
    private appointmentService: AppointmentsService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments();
    this.subscription.push(this.appointmentService.appointments$.subscribe());
    this.subscription.push(
      this.store.select("user").subscribe((user) => {
        this.user = user;
        return;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  createAppointment(event: Appointment) {
    this.appointmentService.addAppointment({
      appointment: event,
      user: this.user,
    });
  }

  onCancel() {
    this.router.navigate(["appointments"]);
  }
}
