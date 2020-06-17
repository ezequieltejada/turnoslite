import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateAppointmentComponent } from "./components/create-appointment/create-appointment.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  {
    path: "",
    component: CreateAppointmentComponent,
  },
];

@NgModule({
  declarations: [CreateAppointmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
  ],
})
export class CreateAppointmentModule {}
