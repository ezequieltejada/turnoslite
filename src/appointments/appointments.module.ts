import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsService } from "./shared/services/appointments/appointments.service";
import { AppointmentsComponent } from './containers/appointments/appointments.component';

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [CommonModule, AppointmentsRoutingModule],
})
export class AppointmentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppointmentsModule,
      providers: [AppointmentsService],
    };
  }
}
