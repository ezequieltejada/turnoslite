import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { switchMap, tap, map } from "rxjs/operators";
import { Store } from "../../../../store";
import { Appointment } from "../../interfaces/appointment.interface";

@Injectable()
export class AppointmentsService {
  constructor(
    private afFirestore: AngularFirestore,
    private authService: AuthService,
    private store: Store
  ) {}

  get appointments$() {
    return this.authService.user$.pipe(
      switchMap((user: firebase.User) => {
        return this.afFirestore
          .collection<Appointment>(`appointments/${user.uid}/appointments`)
          .snapshotChanges();
      }),
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Appointment;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ),
      tap((appointments) => {
        this.store.set("appointments", appointments);
      })
    );
  }

  getAppointments() {
    return this.store.select<Appointment[]>("appointments");
  }

  addAppointment({
    appointment,
    user,
  }: {
    appointment: Appointment;
    user: User;
  }) {
    return this.afFirestore
      .collection<Appointment>(`appointments/${user.uid}/appointments`)
      .add(appointment);
  }
}
