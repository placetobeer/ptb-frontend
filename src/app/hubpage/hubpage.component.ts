import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, NavigationStart, Params, Router, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-hubpage',
  templateUrl: './hubpage.component.html',
  styleUrls: ['./hubpage.component.css']
})
export class HubpageComponent implements OnInit, OnDestroy {
  private subscription;

  constructor(public dataService: DataService, private route: ActivatedRoute, private router: Router) {
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

  parseCurrentRoute(): void{
    const url = this.route.snapshot.url;
    const id = this.parseCurrentParams();
    this.doRouting(url, id);
  }

  doRouting(url: UrlSegment[], id: number): void{

  }

  parseCurrentParams(): number {
    let id = this.route.snapshot.params.id;
    if (id === null){
      id = -1;
    }
    if (!Number.isInteger(id)){
      this.router.navigate(['/error'], { queryParams: { message: id + ' is not a groupId'} });
    }
    return id;
  }



}
