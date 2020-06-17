import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/shared/guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "appointments",
    canActivate: [AuthGuard],
    loadChildren: "../appointments/appointments.module#AppointmentsModule",
  },
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
