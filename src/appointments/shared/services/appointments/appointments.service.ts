import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { switchMap, tap, map, filter } from "rxjs/operators";
import { Store } from "../../../../store";
import { Appointment } from "../../interfaces/appointment.interface";
import { Observable, of } from "rxjs";

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

  getAppointment(id) {
    if (!id) {
      return of({});
    }
    return this.store.select("appointments").pipe(
      filter(Boolean),
      map((appointments: Array<any>) => {
        return appointments.find((appointment) => appointment.id === id);
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

  updateAppointment(payload) {
    return this.afFirestore
      .doc(`appointments/${payload.user.uid}/appointments/${payload.id}`)
      .update(payload.data);
  }

  removeAppointment(payload) {
    return this.afFirestore
      .doc(`appointments/${payload.user.uid}/appointments/${payload.id}`)
      .delete();
  }
}
