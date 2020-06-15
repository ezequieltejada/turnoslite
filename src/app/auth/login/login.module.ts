import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./containers/login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class LoginModule {}
