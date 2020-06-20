import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AppointmentsService } from "../../shared/services/appointments/appointments.service";
import { map, filter } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments$: Observable<any>;
  subscription: Subscription[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.push(this.appointmentService.appointments$.subscribe());
    this.appointments$ = this.appointmentService.getAppointments().pipe(
      filter((value) => value !== null),
      map((appointmentArr) => {
        return appointmentArr.map((appointment) => {
          return {
            id: appointment.id,
            customer: appointment.customer,
            dateTime: appointment.dateTime,
          };
        });
      })
    );
  }

  goToNewAppointment() {
    this.router.navigate([`appointments/new`]);
  }

  goToAppointment(row) {
    this.router.navigate([`appointments/${row.id}`]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }
}
