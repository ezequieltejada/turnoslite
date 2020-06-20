import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { Store } from "store";
import { NavComponent } from "./components/nav/nav.component";
import { AuthModule } from "../auth/auth.module";
import { AppComponent } from "./containers/app/app.component";
import { AppointmentsModule } from "../appointments/appointments.module";
import { HomeComponent } from "./components/home/home.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppointmentsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [Store, { provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
