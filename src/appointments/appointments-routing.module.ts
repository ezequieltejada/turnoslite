import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentsComponent } from "./containers/appointments/appointments.component";
import { AppointmentComponent } from "./containers/appointment/appointment.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AppointmentsComponent,
      },
      {
        path: "new",
        component: AppointmentComponent,
      },
      {
        path: ":id",
        component: AppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
