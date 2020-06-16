import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./containers/register/register.component";
import { SharedModule } from "../shared/shared.module";

export const routes: Routes = [
  {
    path: "",
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class RegisterModule {}
