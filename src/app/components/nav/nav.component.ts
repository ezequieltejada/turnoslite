import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { User } from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-nav",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();

  onLogout() {
    this.logout.emit();
  }
}
