import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { tap } from "rxjs/operators";
import { Store } from "store";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  user$ = this.afAuth.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set("user", null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };
      this.store.set("user", user);
    })
  );

  constructor(private afAuth: AngularFireAuth, private store: Store) {}

  loginUser({ email, password }: { email: string; password: string }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerUser({ email, password }: { email: string; password: string }) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
