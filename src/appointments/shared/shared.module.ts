import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppointmentFormComponent } from "./components/appointment-form/appointment-form.component";
import { AppointmentsService } from "./services/appointments/appointments.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { DatetimeAppointmentSelectorComponent } from "./components/datetime-appointment-selector/datetime-appointment-selector.component";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [
    AppointmentFormComponent,
    DatetimeAppointmentSelectorComponent,
  ],
  exports: [AppointmentFormComponent, MatTableModule, MatButtonModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatNativeDateModule,
    AngularFirestoreModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AppointmentsService],
    };
  }
}
