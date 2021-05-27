import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-routing-popup',
  templateUrl: './routing-popup.component.html',
  styleUrls: ['./routing-popup.component.css']
})
export class RoutingPopupComponent implements OnInit {
  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void { }

  close(): void{
    if (this.groupService.currentGroup != null) {
      this.router.navigate(['/hubpage/' + this.groupService.currentGroup.id]);
    } else {
      this.router.navigate(['/hubpage']);
    }
  }
}
