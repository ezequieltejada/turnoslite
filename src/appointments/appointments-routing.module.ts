import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentsComponent } from "./containers/appointments/appointments.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "new",
        loadChildren:
          "./create-appointment/create-appointment.module#CreateAppointmentModule",
      },
      {
        path: "update",
        loadChildren:
          "./update-appointment/update-appointment.module#UpdateAppointmentModule",
      },
      {
        path: "",
        component: AppointmentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
