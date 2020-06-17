import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./containers/appointments/appointments.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [CommonModule, AppointmentsRoutingModule, SharedModule.forRoot()],
})
export class AppointmentsModule {
}
