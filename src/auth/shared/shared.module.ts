import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth/auth.service";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularFireAuthModule,
  ],
  exports: [AuthFormComponent, MatButtonModule, MatSnackBarModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard],
    };
  }
}
