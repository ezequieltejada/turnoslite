import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentsComponent } from "./containers/appointments/appointments.component";
import { AuthGuard } from "../auth/shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    children: [
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
