import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

export interface State {
  user: firebase.User;
  [key: string]: any;
}

const state: State = {
  user: null,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<t>(name: string) {
    return this.store.pipe(pluck(name));
  }

  set<t>(name: string, newstate: any) {
    this.subject.next({ ...this.value, [name]: newstate });
  }
}
