import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpdateAppointmentComponent } from "./components/update-appointment/update-appointment.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  {
    path: ":id",
    component: UpdateAppointmentComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/appointments",
  },
];

@NgModule({
  declarations: [UpdateAppointmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
  ],
})
export class UpdateAppointmentModule {}
