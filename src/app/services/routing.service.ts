import {Injectable, OnDestroy} from "@angular/core";
import {GroupService} from "./group.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private groupService: GroupService, private router: Router) {
  }

  navigateToHubpage(): void {
    if (this.groupService.currentGroup != null) {
      this.router.navigate(['/hubpage/' + this.groupService.currentGroup.id]);
    } else {
      this.router.navigate(['/hubpage']);
    }
  }
}
