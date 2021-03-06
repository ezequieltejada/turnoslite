import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadChildren: "./login/login.module#LoginModule",
      },
      {
        path: "register",
        loadChildren: "./register/register.module#RegisterModule",
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
