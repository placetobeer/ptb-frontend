import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, UrlSegment} from '@angular/router';
import {GroupService} from '../../core/services/group.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hubpage',
  templateUrl: './hubpage.component.html',
  styleUrls: ['./hubpage.component.css']
})
export class HubpageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(public groupService: GroupService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        if (params.id != null && Number.isInteger(+params.id)) {
          this.doGroupRouting(+params.id);
        } else {
          this.checkParamsError(params.id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkParamsError(id: number): void {
    if (id != null && !Number.isInteger(id)) {
      this.router.navigate(['/error'], {queryParams: {message: id + ' is not a groupId'}});
    }
  }

  private doGroupRouting(id: number): void {
    const group = this.groupService.getGroup(id);
    if (group == null) {
      this.router.navigate(['/error'], {queryParams: {message: 'There is no group with groupId ' + id}});
    } else {
      this.groupService.selectGroup(group);
    }
  }


}
