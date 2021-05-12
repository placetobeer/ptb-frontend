import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, NavigationStart, Params, Router, UrlSegment} from '@angular/router';
import {GroupService} from '../services/group.service';
import {ErrorService} from '../services/error.service';
import {Group} from "../entities/group.model";

@Component({
  selector: 'app-hubpage',
  templateUrl: './hubpage.component.html',
  styleUrls: ['./hubpage.component.css']
})
export class HubpageComponent implements OnInit, OnDestroy {
  private subscription;

  constructor(public groupService: GroupService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.doGroupRouting(this.parseCurrentParams(+params.id));
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private parseCurrentParams(id: number): number {
    if (id == null) {
      return -1;
    }
    if (!Number.isInteger(id)) {
      this.router.navigate(['/error'], {queryParams: {message: id + ' is not a groupId'}});
    }
    return id;
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
