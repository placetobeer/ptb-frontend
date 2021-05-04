import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, NavigationStart, Params, Router, UrlSegment} from '@angular/router';
import {GroupService} from '../services/group.service';
import {ErrorService} from '../services/error.service';

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
    this.subscription = this.router.events.subscribe( this.parseEvent );
    this.parseCurrentRoute();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  parseEvent(event): void {
    if (event instanceof NavigationStart) {
     this.parseCurrentRoute();
    }
  }

  private parseCurrentRoute(): void {
    const url = this.route.snapshot.url;
    const id = this.parseCurrentParams();
    this.doRouting(url, id);
  }

  private doRouting(url: UrlSegment[], id: number): void{
      // todo -1
      const group = this.groupService.getGroup(id);
      if (group == null){
        this.router.navigate(['/error'], { queryParams: { message: 'There is no group with groupId ' + id} });
      } else {
        console.log(group);
        this.groupService.selectGroup(group);
      }
  }

  private parseCurrentParams(): number {
    console.log(this.route.snapshot);
    const id = this.route.snapshot.params.id;
    console.log("the id is: " + id);
    if (id == null){
      return -1;
    }
    if (!Number.isInteger(id)){
      this.router.navigate(['/error'], { queryParams: { message: id + ' is not a groupId'} });
    }
    return id;
  }



}
