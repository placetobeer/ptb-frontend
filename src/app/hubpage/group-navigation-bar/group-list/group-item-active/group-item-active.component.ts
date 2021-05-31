import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../entities/group.model';
import {PopupService} from '../../../../popups/popup.service';
import {MembershipService} from "../../../../services/membership.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-item-active',
  templateUrl: './group-item-active.component.html',
  styleUrls: ['./group-item-active.component.css']
})
export class GroupItemActiveComponent implements OnInit {
  @Input() group: Group;

  constructor(public membershipService: MembershipService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  onEditGroup(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
